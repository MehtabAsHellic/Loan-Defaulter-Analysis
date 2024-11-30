document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loan-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            updateProbabilityBar('lr-prob', 'lr-prob-bar', data.lr_probability);
            updateProbabilityBar('rf-prob', 'rf-prob-bar', data.rf_probability);
            updateProbabilityBar('xgb-prob', 'xgb-prob-bar', data.xgb_probability);
            updateProbabilityBar('avg-prob', 'avg-prob-bar', data.avg_probability);

            updateRiskAssessment(data.risk_level);
            updateKeyRiskFactors(data.key_risk_factors);

            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('show');
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function updateProbabilityBar(textId, barId, probability) {
        const probabilityText = document.getElementById(textId);
        const probabilityBar = document.getElementById(barId);
        const numericProbability = parseFloat(probability.replace('%', ''));

        probabilityText.textContent = probability;
        
        setTimeout(() => {
            probabilityBar.style.width = probability;
            probabilityBar.style.backgroundColor = getProbabilityColor(numericProbability);
        }, 100);
    }

    function getProbabilityColor(probability) {
        if (probability < 30) return '#2ecc71';
        if (probability < 70) return '#f39c12';
        return '#e74c3c';
    }

    function updateRiskAssessment(riskLevel) {
        const riskAssessment = document.getElementById('risk-assessment');
        const riskLevelSpan = document.getElementById('risk-level');
        
        let emoji = '🟢';
        let color = '#2ecc71';
        
        if (riskLevel === 'Medium') {
            emoji = '🟡';
            color = '#f39c12';
        } else if (riskLevel === 'High') {
            emoji = '🔴';
            color = '#e74c3c';
        }
        
        riskLevelSpan.textContent = `${emoji} ${riskLevel} Risk`;
        riskLevelSpan.style.color = color;
        
        riskAssessment.classList.add('fade-in');
    }

    function updateKeyRiskFactors(factors) {
        const riskFactorsList = document.getElementById('risk-factors-list');
        riskFactorsList.innerHTML = '';
        
        factors.forEach(factor => {
            const li = document.createElement('li');
            li.textContent = `${factor.name}: ${factor.value}`;
            li.classList.add('fade-in');
            riskFactorsList.appendChild(li);
        });
    }
});