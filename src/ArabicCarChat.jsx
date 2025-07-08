import { Bot, Car, Clock, MessageCircle, Search, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ArabicCarChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    setIsLoading(true);

    // Add user message to UI
    const userMsgObj = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsgObj]);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    console.log(apiBaseUrl)
    try {
      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          chat_history: chatHistory
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Add bot response to UI
        const botMsgObj = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response,
          timestamp: new Date(),
          metadata: {
            originalQuery: data.original_query,
            searchQuery: data.optimized_search_query,
            resultsCount: data.search_results_count,
            timing: data.timing
          }
        };
        setMessages(prev => [...prev, botMsgObj]);

        // Update chat history for context
        setChatHistory(prev => [
          ...prev,
          {
            user: userMessage,
            assistant: data.response
          }
        ].slice(-5)); // Keep only last 5 exchanges
      } else {
        throw new Error(data.message || 'حدث خطأ في الخادم');
      }
    } catch (error) {
      const errorMsgObj = {
        id: Date.now() + 1,
        type: 'error',
        content: `خطأ: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsgObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setChatHistory([]);
  };


  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Car className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">مساعد السيارات الذكي</h1>
            <p className="text-blue-100 text-sm">مدعوم بالذكاء الاصطناعي - Gemini + Vector Search</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">مرحباً بك في مساعد السيارات</h2>
            <p className="text-gray-500 mb-6">اسأل عن أي سيارة، مواصفاتها، أسعارها، أو حالتها</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type !== 'user' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                <Bot className={`w-5 h-5 ${message.type === 'error' ? 'text-red-600' : 'text-blue-600'}`} />
              </div>
            )}

            <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
              <div
                className={`p-4 rounded-2xl shadow-sm ${message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-white text-gray-800 border border-gray-200'
                  }`}
              >
                <ReactMarkdown className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </ReactMarkdown>

                {/* Metadata for bot messages */}
                {message.type === 'bot' && message.metadata && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Search className="w-3 h-3" />
                        <span>{message.metadata.resultsCount} نتائج</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{message.metadata.timing?.total}</span>
                      </div>
                    </div>
                    {message.metadata.searchQuery !== message.metadata.originalQuery && (
                      <div className="mt-1 text-xs text-gray-400">
                        استعلام محسن: {message.metadata.searchQuery}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-2 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('ar-SA')}
                </div>
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <button
            onClick={clearChat}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
            title="مسح المحادثة"
          >
            مسح
          </button>

          <div className="flex-1 relative">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب سؤالك عن السيارات هنا..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="1"
              style={{ minHeight: '50px', maxHeight: '120px' }}
              disabled={isLoading}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className={`px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition-all ${currentMessage.trim() && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            مدعوم بـ Gemini API + Vector Search | {chatHistory.length} رسائل في السياق
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArabicCarChat;