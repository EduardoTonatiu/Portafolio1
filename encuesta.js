document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('diagnosticForm');
    const evaluateBtn = document.getElementById('evaluateBtn');
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const feedbackP = document.getElementById('feedback');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    

    let userScore = 0;
    let questionScores = [];
    let resultsChart = null;
    

    evaluateBtn.addEventListener('click', evaluateAnswers);
    generatePdfBtn.addEventListener('click', generatePdf);
    
    function evaluateAnswers() {
        if (!validateForm()) {
            alert('Por favor responde todas las preguntas.');
            return;
        }
        
        calculateScore();
        showResults();
        renderChart();
    }
    
    function validateForm() {
        for (let i = 1; i <= 10; i++) {
            if (!document.querySelector(`input[name="q${i}"]:checked`)) {
                return false;
            }
        }
        return true;
    }
    
    function calculateScore() {
        userScore = 0;
        questionScores = [];
        
        for (let i = 1; i <= 10; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            const points = parseInt(selectedOption.value);
            questionScores.push(points);
            userScore += points;
        }
    }
    
    function showResults() {
        scoreSpan.textContent = userScore;
        
        if (userScore >= 25) {
            feedbackP.textContent = '¡Excelente! Dominas los conceptos fundamentales.';
        } else if (userScore >= 15) {
            feedbackP.textContent = 'Buen trabajo, pero hay algunos temas que deberías repasar.';
        } else {
            feedbackP.textContent = 'Considera estudiar más los fundamentos de programación web.';
        }
        
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    function renderChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        

        if (resultsChart) {
            resultsChart.destroy();
        }
        
        resultsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'],
                datasets: [{
                    label: 'Puntos',
                    data: questionScores,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Puntuación por pregunta (0-3 puntos)',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
    
    function generatePdf() {
     
        new Promise(resolve => {
           
            resultsChart.update();
            setTimeout(() => resolve(), 300);
        }).then(() => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
   
            doc.setFont('helvetica');
            doc.setFontSize(20);
            doc.setTextColor(44, 62, 80);
            doc.text('Resultados del Diagnóstico', 105, 20, { align: 'center' });
            
        
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 35);
            doc.text(`Puntuación total: ${userScore}/30`, 14, 45);
            
           
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Retroalimentación:', 14, 60);
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(feedbackP.textContent, 14, 70);
            
            // Tabla deresultados
            doc.autoTable({
                startY: 80,
                head: [['Pregunta', 'Puntos', 'Máximo']],
                body: [
                    ['1', questionScores[0], '3'],
                    ['2', questionScores[1], '3'],
                    ['3', questionScores[2], '3'],
                    ['4', questionScores[3], '3'],
                    ['5', questionScores[4], '3']
                ],
                headStyles: {
                    fillColor: [52, 152, 219],
                    textColor: [255, 255, 255]
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                }
            });
          
            doc.addPage();
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Continuación de resultados', 105, 20, { align: 'center' });
            
            doc.autoTable({
                startY: 30,
                head: [['Pregunta', 'Puntos', 'Máximo']],
                body: [
                    ['6', questionScores[5], '3'],
                    ['7', questionScores[6], '3'],
                    ['8', questionScores[7], '3'],
                    ['9', questionScores[8], '3'],
                    ['10', questionScores[9], '3']
                ],
                headStyles: {
                    fillColor: [52, 152, 219],
                    textColor: [255, 255, 255]
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                }
            });
            

            doc.addPage();
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Gráfico de Resultados', 105, 20, { align: 'center' });
                       const chartCanvas = document.getElementById('resultsChart');
            const chartImage = chartCanvas.toDataURL('image/png', 1.0);
 
            doc.addImage(chartImage, 'PNG', 30, 30, 150, 100);
        
            doc.save('resultados-diagnostico-web.pdf');
        });
    }
});