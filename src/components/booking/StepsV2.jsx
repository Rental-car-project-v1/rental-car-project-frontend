function StepsV2({ steps = [], currentStep, setCurrentStep }) {
  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-grow-1 align-items-center ${
              currentStep === index + 1 ? 'text-primary' : 'text-muted'
            }`}
          >
            <div
              className="mt-2"
              style={{
                position: 'relative',
                padding: '4px',
                backgroundColor: currentStep === index + 1 ? '#007bff' : '#ccc',
                color: currentStep === index + 1 ? '#fff' : '#000',
                textAlign: 'center',
                transition: 'background-color 0.3s, color 0.3s',
                clipPath:
                  index === 0
                    ? 'polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 50%, 0 0)'
                    : 'polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 5% 50%, 0 0)',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              // onClick={() => setCurrentStep(index + 1)}
            >
              {`Step ${index + 1}: ${step}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepsV2
