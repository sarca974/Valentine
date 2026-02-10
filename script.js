
// Scene management
let currentScene = 'intro';


// Wait for envelope drop animation to complete, then make it clickable
setTimeout(() => {
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', openEnvelope);
}, 5500);

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    envelope.classList.add('opening');
    
    setTimeout(() => {
        changeScene('intro', 'letter');
    }, 800);
}

// Continue button
document.getElementById('continue-btn').addEventListener('click', () => {
    changeScene('letter', 'q1');
});

// Answer buttons for questions
document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const nextScene = e.target.getAttribute('data-next');
        const currentSceneId = e.target.closest('.scene').id.replace('scene-', '');
        changeScene(currentSceneId, nextScene);
    });
});

// Final buttons
document.getElementById('yes-btn-1').addEventListener('click', showFinalMessage);
document.getElementById('yes-btn-2').addEventListener('click', showFinalMessage);

function changeScene(from, to) {
    const fromScene = document.getElementById(`scene-${from}`);
    const toScene = document.getElementById(`scene-${to}`);
    
    fromScene.classList.remove('active');
    
    setTimeout(() => {
        toScene.classList.add('active');
        currentScene = to;
    }, 300);
}

function showFinalMessage() {
    const finalScene = document.getElementById('scene-final');
    const endScene = document.getElementById('scene-end');
    
    finalScene.classList.remove('active');
    
    setTimeout(() => {
        endScene.classList.add('active');
        createStarExplosion();
    }, 300);
}

function createStarExplosion() {
    const explosionContainer = document.querySelector('.star-explosion');
    
    // Create multiple star particles
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.textContent = '✨';
        star.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: 50%;
            top: 50%;
            animation: starBurst ${Math.random() * 1 + 1}s ease-out forwards;
            animation-delay: ${Math.random() * 0.3}s;
            --angle: ${(360 / 30) * i}deg;
            --distance: ${Math.random() * 150 + 100}px;
        `;
        explosionContainer.appendChild(star);
    }
    
    // Add star burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starBurst {
            0% {
                transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--angle)) translateY(var(--distance)) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add floating particles effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0.3;
            }
            25% {
                transform: translate(50px, -50px);
                opacity: 0.7;
            }
            50% {
                transform: translate(-30px, -100px);
                opacity: 1;
            }
            75% {
                transform: translate(-50px, -50px);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating particles
createFloatingParticles();