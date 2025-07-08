import { Car, CheckCircle, Circle, CreditCard, FileText, MapPin, Phone, Upload, User } from 'lucide-react';
import { useState } from 'react';

const SalesJourneyApp = () => {
  const [journeyData, setJourneyData] = useState({
    customerName: '',
    phone: '',
    city: '',
    paymentType: '',
    selectedCar: '',
    currentStage: 'initial',
    stageData: {}
  });

  const [showJourney, setShowJourney] = useState(false);
  const [showCarChange, setShowCarChange] = useState(false);
  const [newCarSelection, setNewCarSelection] = useState('');
  const [showRefundProcess, setShowRefundProcess] = useState(false);
  const [refundNote, setRefundNote] = useState('');
  const [showAccessoryChoice, setShowAccessoryChoice] = useState(false);
  const [accessoryChoice, setAccessoryChoice] = useState('');
  const [accessoryDetails, setAccessoryDetails] = useState('');

  const availableCars = [
    'Toyota Camry 2024 - White',
    'Honda Accord 2024 - Black',
    'BMW 3 Series 2024 - Silver',
    'Mercedes C-Class 2024 - Blue',
    'Audi A4 2024 - Red',
    'Lexus ES 2024 - Gray',
    'Nissan Altima 2024 - White',
    'Hyundai Sonata 2024 - Black'
  ];

  const cashStages = [
    {
      id: 'sale_chance',
      name: 'Sale Chance',
      description: 'Initial contact with prospect',
      documents: [],
      actions: [],
      owner: 'Sales Specialist'
    },
    {
      id: 'deposit',
      name: 'Deposit',
      description: 'Secure deposit from customer',
      documents: [],
      actions: ['Mark Deposit Received'],
      owner: 'Sales Specialist'
    },
    {
      id: 'car_request',
      name: 'Car Request',
      description: 'Confirm customer wants to proceed',
      documents: [],
      actions: ['Customer Confirmation'],
      owner: 'Sales Specialist'
    },
    {
      id: 'car_reserving',
      name: 'Car Reserving',
      description: 'Verify car availability with showroom',
      documents: [],
      actions: ['Car Available Confirmed'],
      owner: 'Sales Specialist'
    },
    {
      id: 'payment',
      name: 'Payment',
      description: 'Collect full payment and required documents',
      documents: ['Customer ID', 'Driver License', 'Payment Receipt'],
      actions: ['Payment Received'],
      owner: 'Sales Specialist'
    },
    {
      id: 'final_inspection',
      name: 'Final Inspection',
      description: 'Conduct final car inspection',
      documents: ['Final Inspection Report'],
      actions: ['Inspection Completed'],
      owner: 'Inspector'
    },
    {
      id: 'transfer_showroom',
      name: 'Transfer to Showroom',
      description: 'Transfer payment to showroom',
      documents: ['Payment Check', 'Customer ID Copy', 'License Copy'],
      actions: ['Transfer Completed'],
      owner: 'Accountant'
    },
    {
      id: 'ready_pickup',
      name: 'Ready for Pickup',
      description: 'Car registration and paperwork complete',
      documents: ['Car License', 'Insurance Documents'],
      actions: ['Ready Confirmed'],
      owner: 'Sales Specialist'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Present available accessories to customer',
      documents: [],
      actions: ['Customer Response Documented'],
      owner: 'Sales Specialist'
    },
    {
      id: 'shipping',
      name: 'Shipping',
      description: 'Coordinate car delivery',
      documents: ['Shipping Documentation'],
      actions: ['Shipping Arranged'],
      owner: 'Sales Specialist'
    },
    {
      id: 'collected',
      name: 'Collected',
      description: 'Customer receives the car',
      documents: ['Customer Signature Confirmation'],
      actions: ['Car Delivered'],
      owner: 'Sales Specialist'
    },
    {
      id: 'completed',
      name: 'Completed',
      description: 'Sale journey completed',
      documents: [],
      actions: [],
      owner: 'Sales Specialist'
    }
  ];

  const financeStages = [
    {
      id: 'sale_chance',
      name: 'Sale Chance',
      description: 'Initial contact with prospect',
      documents: [],
      actions: [],
      owner: 'Sales Specialist'
    },
    {
      id: 'paperwork_submission',
      name: 'Paperwork Submission',
      description: 'Customer submits financing documents',
      documents: ['Application Form', 'Income Documents', 'ID Copy', 'Bank Statements'],
      actions: ['All Documents Received'],
      owner: 'Sales Specialist'
    },
    {
      id: 'bank_approval',
      name: 'Bank Approval',
      description: 'Waiting for bank approval',
      documents: ['Bank Approval Letter'],
      actions: ['Bank Approved'],
      owner: 'Banker'
    },
    {
      id: 'contract_signing',
      name: 'Contract Signing',
      description: 'Customer signs financing contract',
      documents: ['Signed Contract'],
      actions: ['Contract Signed'],
      owner: 'Sales Specialist'
    },
    {
      id: 'car_reserving',
      name: 'Car Reserving',
      description: 'Verify car availability with showroom',
      documents: [],
      actions: ['Car Available Confirmed'],
      owner: 'Sales Specialist'
    },
    {
      id: 'payment',
      name: 'Payment',
      description: 'Collect full payment and required documents',
      documents: ['Customer ID', 'Driver License', 'Payment Receipt'],
      actions: ['Payment Received'],
      owner: 'Sales Specialist'
    },
    {
      id: 'final_inspection',
      name: 'Final Inspection',
      description: 'Conduct final car inspection',
      documents: ['Final Inspection Report'],
      actions: ['Inspection Completed'],
      owner: 'Inspector'
    },
    {
      id: 'transfer_showroom',
      name: 'Transfer to Showroom',
      description: 'Transfer payment to showroom',
      documents: ['Payment Check', 'Customer ID Copy', 'License Copy'],
      actions: ['Transfer Completed'],
      owner: 'Accountant'
    },
    {
      id: 'ready_pickup',
      name: 'Ready for Pickup',
      description: 'Car registration and paperwork complete',
      documents: ['Car License', 'Insurance Documents'],
      actions: ['Ready Confirmed'],
      owner: 'Sales Specialist'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Present available accessories to customer',
      documents: [],
      actions: ['Customer Response Documented'],
      owner: 'Sales Specialist'
    },
    {
      id: 'shipping',
      name: 'Shipping',
      description: 'Coordinate car delivery',
      documents: ['Shipping Documentation'],
      actions: ['Shipping Arranged'],
      owner: 'Sales Specialist'
    },
    {
      id: 'collected',
      name: 'Collected',
      description: 'Customer receives the car',
      documents: ['Customer Signature Confirmation'],
      actions: ['Car Delivered'],
      owner: 'Sales Specialist'
    },
    {
      id: 'completed',
      name: 'Completed',
      description: 'Sale journey completed',
      documents: [],
      actions: [],
      owner: 'Sales Specialist'
    }
  ];

  const getCurrentStages = () => {
    return journeyData.paymentType === 'cash' ? cashStages : financeStages;
  };

  const getCurrentStageIndex = () => {
    const stages = getCurrentStages();
    return stages.findIndex(stage => stage.id === journeyData.currentStage);
  };

  const handleInputChange = (field, value) => {
    setJourneyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startJourney = () => {
    if (journeyData.customerName && journeyData.phone && journeyData.city && journeyData.paymentType && journeyData.selectedCar) {
      setJourneyData(prev => ({
        ...prev,
        currentStage: 'sale_chance'
      }));
      setShowJourney(true);
    }
  };

  const toggleDocument = (stageId, docName) => {
    setJourneyData(prev => ({
      ...prev,
      stageData: {
        ...prev.stageData,
        [stageId]: {
          ...prev.stageData[stageId],
          documents: {
            ...prev.stageData[stageId]?.documents,
            [docName]: !prev.stageData[stageId]?.documents?.[docName]
          }
        }
      }
    }));
  };

  const toggleAction = (stageId, actionName) => {
    setJourneyData(prev => ({
      ...prev,
      stageData: {
        ...prev.stageData,
        [stageId]: {
          ...prev.stageData[stageId],
          actions: {
            ...prev.stageData[stageId]?.actions,
            [actionName]: !prev.stageData[stageId]?.actions?.[actionName]
          }
        }
      }
    }));
  };

  const canAdvanceStage = (stage) => {
    const stageData = journeyData.stageData[stage.id];
    if (!stageData) return false;

    if (stage.id === 'accessories') {
      const choice = stageData.choice;
      if (choice === 'no') {
        return stageData.actions?.['Customer Response Documented'] === true;
      } else if (choice === 'yes') {
        return stageData.documents?.['Accessory Payment Proof'] === true &&
          stageData.documents?.['Accessory Details'] === true &&
          stageData.actions?.['Customer Response Documented'] === true;
      }
      return false;
    }

    const allDocsUploaded = stage.documents.every(doc =>
      stageData.documents?.[doc] === true
    );

    const allActionsCompleted = stage.actions.every(action =>
      stageData.actions?.[action] === true
    );

    return allDocsUploaded && allActionsCompleted;
  };

  const advanceToNextStage = () => {
    const stages = getCurrentStages();
    const currentIndex = getCurrentStageIndex();

    if (currentIndex < stages.length - 1) {
      setJourneyData(prev => ({
        ...prev,
        currentStage: stages[currentIndex + 1].id
      }));
    }
  };

  const handleDepositPayment = () => {
    setJourneyData(prev => ({
      ...prev,
      stageData: {
        ...prev.stageData,
        deposit: {
          ...prev.stageData.deposit,
          actions: {
            ...prev.stageData.deposit?.actions,
            'Mark Deposit Received': true
          }
        }
      }
    }));

    setTimeout(() => {
      setJourneyData(prev => ({
        ...prev,
        currentStage: 'car_request'
      }));
    }, 500);
  };

  const handleSaleChanceDeposit = () => {
    setTimeout(() => {
      setJourneyData(prev => ({
        ...prev,
        currentStage: 'deposit'
      }));
    }, 100);

    setTimeout(() => {
      handleDepositPayment();
    }, 200);
  };

  const handleCarChange = () => {
    if (newCarSelection) {
      setJourneyData(prev => ({
        ...prev,
        selectedCar: newCarSelection
      }));
      setShowCarChange(false);
      setNewCarSelection('');
    }
  };

  const handleCustomerRefund = () => {
    if (refundNote.trim()) {
      try {
        setJourneyData(prev => ({
          ...prev,
          stageData: {
            ...prev.stageData,
            car_request: {
              ...prev.stageData.car_request,
              refunded: true,
              refundNote: refundNote
            }
          },
          currentStage: 'refund_completed'
        }));
        setShowRefundProcess(false);
        setRefundNote('');
      } catch (error) {
        console.error('Error processing refund:', error);
      }
    }
  };

  const handleAccessoryChoice = (choice) => {
    setAccessoryChoice(choice);
    if (choice === 'no') {
      setJourneyData(prev => ({
        ...prev,
        stageData: {
          ...prev.stageData,
          accessories: {
            ...prev.stageData.accessories,
            choice: 'no',
            actions: {
              'Customer Response Documented': true
            }
          }
        }
      }));
    } else if (choice === 'yes') {
      // Customer wants accessories - update state to show the accessory form
      setJourneyData(prev => ({
        ...prev,
        stageData: {
          ...prev.stageData,
          accessories: {
            ...prev.stageData.accessories,
            choice: 'yes'
          }
        }
      }));
    }
  };

  const handleAccessoryCompletion = () => {
    if (accessoryDetails.trim()) {
      setJourneyData(prev => ({
        ...prev,
        stageData: {
          ...prev.stageData,
          accessories: {
            ...prev.stageData.accessories,
            choice: 'yes',
            details: accessoryDetails,
            documents: {
              'Accessory Payment Proof': true,
              'Accessory Details': true
            },
            actions: {
              'Customer Response Documented': true
            }
          }
        }
      }));
      setAccessoryDetails('');
    }
  };

  const isDocumentUploaded = (stageId, docName) => {
    return journeyData.stageData[stageId]?.documents?.[docName] === true;
  };

  const isActionCompleted = (stageId, actionName) => {
    return journeyData.stageData[stageId]?.actions?.[actionName] === true;
  };

  if (!showJourney) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Car className="mx-auto h-16 w-16 text-blue-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Journey Tracker</h1>
              <p className="text-gray-600">Create a new sales journey for your customer</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Customer Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                  value={journeyData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                  value={journeyData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                  value={journeyData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Car className="h-4 w-4 mr-2" />
                  Select Car
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={journeyData.selectedCar}
                  onChange={(e) => handleInputChange('selectedCar', e.target.value)}
                >
                  <option value="">Choose a car...</option>
                  {availableCars.map((car) => (
                    <option key={car} value={car}>{car}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 border-2 rounded-lg transition-all ${journeyData.paymentType === 'cash'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                    onClick={() => handleInputChange('paymentType', 'cash')}
                  >
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">Cash</div>
                    </div>
                  </button>
                  <button
                    className={`p-4 border-2 rounded-lg transition-all ${journeyData.paymentType === 'finance'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                    onClick={() => handleInputChange('paymentType', 'finance')}
                  >
                    <div className="text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">Finance</div>
                    </div>
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={startJourney}
                disabled={!journeyData.customerName || !journeyData.phone || !journeyData.city || !journeyData.paymentType || !journeyData.selectedCar}
              >
                Start Sales Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stages = getCurrentStages();
  const currentStageIndex = getCurrentStageIndex();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sales Journey</h1>
              <p className="text-gray-600">
                {journeyData.customerName} • {journeyData.phone} • {journeyData.city} • {journeyData.paymentType.toUpperCase()} • {journeyData.selectedCar}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Stage</div>
              <div className="text-lg font-semibold text-blue-600">
                {stages[currentStageIndex]?.name}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Journey Progress</h2>
            <span className="text-sm text-gray-500">
              {currentStageIndex + 1} of {stages.length} stages
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${index < currentStageIndex
                  ? 'bg-green-500 text-white'
                  : index === currentStageIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }`}>
                  {index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div className={`w-8 h-1 ${index < currentStageIndex ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {journeyData.currentStage === 'car_request' && !journeyData.stageData.car_request?.refunded && (
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Customer Changed Mind?</h3>
                <p className="text-red-600">If customer doesn't want to proceed, process refund here.</p>
              </div>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                onClick={() => setShowRefundProcess(true)}
              >
                Process Refund
              </button>
            </div>
          </div>
        )}

        {journeyData.currentStage === 'car_reserving' && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Need to Change Car?</h3>
                <p className="text-orange-600">Current car: <strong>{journeyData.selectedCar}</strong></p>
              </div>
              <button
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center"
                onClick={() => setShowCarChange(true)}
              >
                <Car className="h-5 w-5 mr-2" />
                Change Car
              </button>
            </div>
          </div>
        )}

        {journeyData.currentStage === 'accessories' && !journeyData.stageData.accessories?.choice && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="text-center mb-6">
              <Car className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-800 mb-2">Present Available Accessories</h3>
              <p className="text-purple-600 mb-6">Show customer available accessories and get their response</p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  className="bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  onClick={() => handleAccessoryChoice('yes')}
                >
                  Customer Wants Accessories
                </button>
                <button
                  className="bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  onClick={() => handleAccessoryChoice('no')}
                >
                  No Accessories Needed
                </button>
              </div>
            </div>
          </div>
        )}

        {journeyData.currentStage === 'accessories' && journeyData.stageData.accessories?.choice === 'yes' && !journeyData.stageData.accessories?.documents?.['Accessory Payment Proof'] && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">Process Accessory Order</h3>
              <p className="text-amber-600 mb-4">Customer wants accessories. Document the details and collect payment:</p>

              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4 h-24 resize-none"
                placeholder="Enter accessory details, pricing, and payment information..."
                value={accessoryDetails}
                onChange={(e) => setAccessoryDetails(e.target.value)}
              />

              <button
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50"
                onClick={handleAccessoryCompletion}
                disabled={!accessoryDetails.trim()}
              >
                Complete Accessory Order
              </button>
            </div>
          </div>
        )}

        {journeyData.paymentType === 'cash' && journeyData.currentStage === 'sale_chance' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="text-center">
              <CreditCard className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Ready to Take Deposit</h3>
              <p className="text-green-600 mb-6">Customer is ready to pay the deposit. Click to process and advance the journey.</p>
              <button
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg flex items-center mx-auto"
                onClick={handleSaleChanceDeposit}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Process Deposit Payment
              </button>
            </div>
          </div>
        )}

        {journeyData.paymentType === 'finance' && journeyData.currentStage === 'sale_chance' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="text-center">
              <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Ready for Financing Application</h3>
              <p className="text-blue-600 mb-6">Customer is interested in financing. Click to start the paperwork process.</p>
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center mx-auto"
                onClick={() => setJourneyData(prev => ({ ...prev, currentStage: 'paperwork_submission' }))}
              >
                <FileText className="h-5 w-5 mr-2" />
                Start Financing Process
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                {currentStageIndex + 1}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{stages[currentStageIndex]?.name}</h2>
                <p className="text-gray-600">{stages[currentStageIndex]?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Stage Owner</div>
              <div className="text-lg font-semibold text-purple-600">
                {stages[currentStageIndex]?.owner}
              </div>
            </div>
          </div>

          {stages[currentStageIndex]?.documents?.length > 0 && journeyData.currentStage !== 'accessories' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-3">
                {stages[currentStageIndex].documents.map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{doc}</span>
                    </div>
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${isDocumentUploaded(stages[currentStageIndex].id, doc)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      onClick={() => toggleDocument(stages[currentStageIndex].id, doc)}
                    >
                      {isDocumentUploaded(stages[currentStageIndex].id, doc) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Uploaded
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {journeyData.currentStage === 'accessories' && journeyData.stageData.accessories?.choice === 'yes' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">Accessory Details</span>
                  </div>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${journeyData.stageData.accessories?.documents?.['Accessory Details']
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    onClick={() => toggleDocument('accessories', 'Accessory Details')}
                  >
                    {journeyData.stageData.accessories?.documents?.['Accessory Details'] ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Documented
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Document
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">Accessory Payment Proof</span>
                  </div>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${journeyData.stageData.accessories?.documents?.['Accessory Payment Proof']
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    onClick={() => toggleDocument('accessories', 'Accessory Payment Proof')}
                  >
                    {journeyData.stageData.accessories?.documents?.['Accessory Payment Proof'] ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {stages[currentStageIndex]?.actions?.length > 0 && journeyData.currentStage !== 'accessories' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Actions</h3>
              <div className="space-y-3">
                {stages[currentStageIndex].actions.map((action) => (
                  <div key={action} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-900">{action}</span>
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${isActionCompleted(stages[currentStageIndex].id, action)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => toggleAction(stages[currentStageIndex].id, action)}
                    >
                      {isActionCompleted(stages[currentStageIndex].id, action) ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2" />
                      )}
                      {isActionCompleted(stages[currentStageIndex].id, action) ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {journeyData.currentStage === 'accessories' && journeyData.stageData.accessories?.choice && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Actions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Customer Response Documented</span>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${journeyData.stageData.accessories?.actions?.['Customer Response Documented']
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => toggleAction('accessories', 'Customer Response Documented')}
                  >
                    {journeyData.stageData.accessories?.actions?.['Customer Response Documented'] ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Circle className="h-4 w-4 mr-2" />
                    )}
                    {journeyData.stageData.accessories?.actions?.['Customer Response Documented'] ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
                {journeyData.stageData.accessories?.choice === 'no' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600"><strong>Customer Decision:</strong> No accessories needed</p>
                  </div>
                )}
                {journeyData.stageData.accessories?.choice === 'yes' && journeyData.stageData.accessories?.details && (
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1"><strong>Accessory Details:</strong></p>
                    <p className="text-gray-800">{journeyData.stageData.accessories.details}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStageIndex < stages.length - 1 && (
            <div className="flex justify-end">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all ${canAdvanceStage(stages[currentStageIndex])
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={advanceToNextStage}
                disabled={!canAdvanceStage(stages[currentStageIndex])}
              >
                Advance to Next Stage
              </button>
            </div>
          )}

          {currentStageIndex === stages.length - 1 && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Journey Completed!</h3>
              <p className="text-gray-600">All stages have been successfully completed.</p>
            </div>
          )}

          {journeyData.currentStage === 'refund_completed' && (
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Journey Completed - Refund Processed</h3>
              <p className="text-gray-600 mb-4">Customer decided not to proceed. Deposit has been refunded.</p>
              <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-1"><strong>Refund Note:</strong></p>
                <p className="text-gray-800">{journeyData.stageData?.car_request?.refundNote || 'No note provided'}</p>
              </div>
            </div>
          )}
        </div>

        {showCarChange && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Change Selected Car</h3>
              <p className="text-gray-600 mb-4">Current: <strong>{journeyData.selectedCar}</strong></p>

              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
                value={newCarSelection}
                onChange={(e) => setNewCarSelection(e.target.value)}
              >
                <option value="">Choose new car...</option>
                {availableCars.filter(car => car !== journeyData.selectedCar).map((car) => (
                  <option key={car} value={car}>{car}</option>
                ))}
              </select>

              <div className="flex space-x-3">
                <button
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => {
                    setShowCarChange(false);
                    setNewCarSelection('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  onClick={handleCarChange}
                  disabled={!newCarSelection}
                >
                  Change Car
                </button>
              </div>
            </div>
          </div>
        )}

        {showRefundProcess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Process Customer Refund</h3>
              <p className="text-gray-600 mb-4">Please provide a note about why the customer decided not to proceed:</p>

              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6 h-24 resize-none"
                placeholder="e.g., Customer found a better deal elsewhere, changed mind about car model, etc."
                value={refundNote}
                onChange={(e) => setRefundNote(e.target.value)}
              />

              <div className="flex space-x-3">
                <button
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => {
                    setShowRefundProcess(false);
                    setRefundNote('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  onClick={handleCustomerRefund}
                  disabled={!refundNote.trim()}
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesJourneyApp;