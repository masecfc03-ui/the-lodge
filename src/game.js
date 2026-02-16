import Phaser from 'phaser';
import nipplejs from 'nipplejs';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        // Room definitions with their positions and interactive objects
        this.rooms = {
            'Base Camp': { x: 200, y: 200, object: { x: 250, y: 250, type: 'fireplace' } },
            'Projects': { x: 400, y: 200, object: { x: 450, y: 250, type: 'desk' } },
            'The Team': { x: 600, y: 200, object: { x: 650, y: 250, type: 'bunks' } },
            'Treasury': { x: 200, y: 400, object: { x: 250, y: 450, type: 'safe' } },
            'Main Hall': { x: 400, y: 400, object: { x: 450, y: 450, type: 'spawn' } },
            'Command Center': { x: 600, y: 400, object: { x: 650, y: 450, type: 'radio' } },
            'Jukebox': { x: 200, y: 600, object: { x: 250, y: 650, type: 'jukebox' } },
            'Field Journal': { x: 400, y: 600, object: { x: 450, y: 650, type: 'bookshelf' } },
            'Trail Cams': { x: 600, y: 600, object: { x: 650, y: 650, type: 'monitors' } }
        };
        
        this.currentRoom = 'Main Hall';
        this.nearObject = null;
        this.particles = [];
    }
    
    preload() {
        // Create simple colored rectangles for rooms and objects
        this.load.image('room-floor', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
    }
    
    create() {
        // Create room graphics
        this.createRooms();
        
        // Create player
        this.player = this.add.circle(450, 450, 15, 0x32cd32);
        this.playerLabel = this.add.text(450, 430, 'M', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            color: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Enable physics for player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(30, 30);
        
        // Create interactive objects
        this.interactiveObjects = this.physics.add.group();
        this.createInteractiveObjects();
        
        // Setup input
        this.setupInput();
        
        // Setup mobile controls if needed
        if (window.isMobile) {
            this.setupMobileControls();
        }
        
        // Camera follow player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);
        
        // Create particles
        this.createParticles();
        
        // Update room name initially
        this.updateCurrentRoom();
        
        console.log('🎮 Game scene created successfully!');
    }
    
    createRooms() {
        this.roomGraphics = this.add.group();
        
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            // Room floor (wood color)
            const floor = this.add.rectangle(room.x, room.y, 200, 200, 0x8B4513);
            floor.setStrokeStyle(4, 0x654321);
            
            // Room walls (darker brown)
            const walls = this.add.rectangle(room.x, room.y, 200, 200);
            walls.setStrokeStyle(8, 0x2F1B14);
            
            // Room label
            const label = this.add.text(room.x, room.y - 120, roomName, {
                fontSize: '14px',
                fontFamily: 'Courier New, monospace',
                color: '#e6d3a3',
                fontWeight: 'bold',
                backgroundColor: 'rgba(45, 24, 16, 0.8)',
                padding: { x: 8, y: 4 }
            }).setOrigin(0.5);
            
            this.roomGraphics.add(floor);
            this.roomGraphics.add(walls);
            this.roomGraphics.add(label);
        });
        
        // Create doorways (gaps in walls)
        this.createDoorways();
    }
    
    createDoorways() {
        // Horizontal doorways
        const doorwayColor = 0x8B4513;
        
        // Top row connections
        this.add.rectangle(300, 200, 20, 8, doorwayColor); // Base Camp to Projects
        this.add.rectangle(500, 200, 20, 8, doorwayColor); // Projects to The Team
        
        // Middle row connections  
        this.add.rectangle(300, 400, 20, 8, doorwayColor); // Treasury to Main Hall
        this.add.rectangle(500, 400, 20, 8, doorwayColor); // Main Hall to Command Center
        
        // Bottom row connections
        this.add.rectangle(300, 600, 20, 8, doorwayColor); // Jukebox to Field Journal
        this.add.rectangle(500, 600, 20, 8, doorwayColor); // Field Journal to Trail Cams
        
        // Vertical doorways
        this.add.rectangle(200, 300, 8, 20, doorwayColor); // Base Camp to Treasury
        this.add.rectangle(400, 300, 8, 20, doorwayColor); // Projects to Main Hall
        this.add.rectangle(600, 300, 8, 20, doorwayColor); // The Team to Command Center
        
        this.add.rectangle(200, 500, 8, 20, doorwayColor); // Treasury to Jukebox
        this.add.rectangle(400, 500, 8, 20, doorwayColor); // Main Hall to Field Journal
        this.add.rectangle(600, 500, 8, 20, doorwayColor); // Command Center to Trail Cams
    }
    
    createInteractiveObjects() {
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            if (room.object.type === 'spawn') return; // Skip spawn point
            
            // Create glowing object
            const obj = this.add.circle(room.object.x, room.object.y, 20, this.getObjectColor(room.object.type));
            obj.setStrokeStyle(3, 0xFF8C00);
            
            // Add physics
            this.physics.add.existing(obj);
            obj.body.setImmovable(true);
            obj.roomName = roomName;
            obj.objectType = room.object.type;
            
            this.interactiveObjects.add(obj);
            
            // Add glow animation
            this.tweens.add({
                targets: obj,
                alpha: { from: 0.7, to: 1.0 },
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    getObjectColor(type) {
        const colors = {
            fireplace: 0xFF4500,
            desk: 0x8B4513,
            bunks: 0x4682B4,
            safe: 0xFFD700,
            radio: 0x32CD32,
            jukebox: 0xFF1493,
            bookshelf: 0x8B4513,
            monitors: 0x00CED1
        };
        return colors[type] || 0xFF8C00;
    }
    
    setupInput() {
        // Keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        this.interact = this.input.keyboard.addKey('E');
        
        // Interaction key handler
        this.interact.on('down', () => {
            this.handleInteraction();
        });
        
        // ESC key to close panels
        this.input.keyboard.addKey('ESC').on('down', () => {
            window.lodgeUI.closePanel();
        });
    }
    
    setupMobileControls() {
        // Setup nipple joystick
        const joystickManager = nipplejs.create({
            zone: document.getElementById('joystick-area'),
            mode: 'static',
            position: { left: '60px', top: '60px' },
            color: 'orange',
            size: 80
        });
        
        this.joystickData = { x: 0, y: 0 };
        
        joystickManager.on('move', (event, data) => {
            const force = Math.min(data.force, 1);
            const angle = data.angle.radian;
            this.joystickData.x = Math.cos(angle) * force;
            this.joystickData.y = -Math.sin(angle) * force;
        });
        
        joystickManager.on('end', () => {
            this.joystickData.x = 0;
            this.joystickData.y = 0;
        });
        
        // Mobile interact button
        document.getElementById('interact-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInteraction();
        });
    }
    
    createParticles() {
        // Create floating dust particles for atmosphere
        for (let i = 0; i < 50; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(0, 1200),
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(1, 3),
                0xDDDDDD,
                Phaser.Math.FloatBetween(0.1, 0.3)
            );
            
            this.tweens.add({
                targets: particle,
                y: particle.y - Phaser.Math.Between(50, 200),
                duration: Phaser.Math.Between(10000, 20000),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
            
            this.particles.push(particle);
        }
    }
    
    update() {
        // Player movement
        const speed = 160;
        
        if (window.isMobile && (this.joystickData.x !== 0 || this.joystickData.y !== 0)) {
            // Mobile joystick movement
            this.player.body.setVelocity(
                this.joystickData.x * speed,
                this.joystickData.y * speed
            );
        } else {
            // Keyboard movement
            let velocityX = 0;
            let velocityY = 0;
            
            if (this.cursors.left.isDown || this.wasd.A.isDown) {
                velocityX = -speed;
            } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
                velocityX = speed;
            }
            
            if (this.cursors.up.isDown || this.wasd.W.isDown) {
                velocityY = -speed;
            } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
                velocityY = speed;
            }
            
            this.player.body.setVelocity(velocityX, velocityY);
        }
        
        // Update player label position
        this.playerLabel.setPosition(this.player.x, this.player.y - 20);
        
        // Check room changes and nearby objects
        this.updateCurrentRoom();
        this.checkNearbyObjects();
    }
    
    updateCurrentRoom() {
        let newRoom = null;
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            const distance = Phaser.Math.Distance.Between(playerX, playerY, room.x, room.y);
            if (distance < 100) { // Within room bounds
                newRoom = roomName;
            }
        });
        
        if (newRoom && newRoom !== this.currentRoom) {
            this.currentRoom = newRoom;
            document.getElementById('room-name').textContent = this.currentRoom;
        }
    }
    
    checkNearbyObjects() {
        let nearestObject = null;
        let minDistance = 50; // Interaction distance
        
        this.interactiveObjects.children.entries.forEach(obj => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, obj.x, obj.y);
            if (distance < minDistance) {
                nearestObject = obj;
                minDistance = distance;
            }
        });
        
        if (nearestObject !== this.nearObject) {
            this.nearObject = nearestObject;
            const prompt = document.getElementById('interaction-prompt');
            
            if (this.nearObject) {
                prompt.style.display = 'block';
            } else {
                prompt.style.display = 'none';
            }
        }
    }
    
    handleInteraction() {
        if (this.nearObject) {
            window.lodgeUI.openPanel(this.nearObject.roomName, this.nearObject.objectType);
        }
    }
}