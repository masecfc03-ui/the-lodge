import Phaser from 'phaser';
import { GameScene } from './game.js';
import { UI } from './ui.js';

// Detect mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                  ('ontouchstart' in window) || 
                  (navigator.maxTouchPoints > 0);

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#0a1f0a', // Dark forest green
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height: 1200
        }
    },
    scene: GameScene
};

// Initialize the game
const game = new Phaser.Game(config);

// Initialize UI controller
const ui = new UI(isMobile);

// Make game globally accessible for UI
window.lodgeGame = game;
window.lodgeUI = ui;
window.isMobile = isMobile;

// Show mobile controls if on mobile
if (isMobile) {
    document.getElementById('mobile-controls').style.display = 'block';
}

console.log('🏕️ The Lodge initialized successfully!');