import Phaser from 'phaser';
import nipplejs from 'nipplejs';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        // Room definitions with their positions and interactive objects (400x300 rooms with 30px walls)
        this.roomWidth = 400;
        this.roomHeight = 300;
        this.wallThickness = 30;
        
        this.rooms = {
            'Base Camp': { x: 230, y: 180, object: { x: 230, y: 180, type: 'fireplace' }, color: '#3d2214' },
            'Projects': { x: 630, y: 180, object: { x: 630, y: 180, type: 'desk' }, color: '#3e2415' },
            'The Team': { x: 1030, y: 180, object: { x: 1030, y: 180, type: 'bunks' }, color: '#3f2516' },
            'Treasury': { x: 230, y: 480, object: { x: 230, y: 480, type: 'safe' }, color: '#402617' },
            'Main Hall': { x: 630, y: 480, object: { x: 630, y: 480, type: 'spawn' }, color: '#412718' },
            'Command Center': { x: 1030, y: 480, object: { x: 1030, y: 480, type: 'radio' }, color: '#422819' },
            'Jukebox': { x: 230, y: 780, object: { x: 230, y: 780, type: 'jukebox' }, color: '#43291a' },
            'Field Journal': { x: 630, y: 780, object: { x: 630, y: 780, type: 'bookshelf' }, color: '#442a1b' },
            'Trail Cams': { x: 1030, y: 780, object: { x: 1030, y: 780, type: 'monitors' }, color: '#452b1c' }
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
        
        // Create player (18px radius, bright green with white M)
        this.player = this.add.circle(630, 480, 18, 0x32cd32);
        this.playerLabel = this.add.text(630, 480, 'M', {
            fontSize: '20px',
            fontFamily: 'Courier New, monospace',
            color: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Enable physics for player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(36, 36);
        
        // Create trail effect (3 fading circles)
        this.playerTrail = [];
        for (let i = 0; i < 3; i++) {
            const trailCircle = this.add.circle(630, 480, 16 - i * 4, 0x32cd32, 0.6 - i * 0.15);
            trailCircle.visible = false;
            this.playerTrail.push(trailCircle);
        }
        
        // Create interactive objects
        this.interactiveObjects = this.physics.add.group();
        this.createInteractiveObjects();
        
        // Setup input
        this.setupInput();
        
        // Setup mobile controls if needed
        if (window.isMobile) {
            this.setupMobileControls();
        }
        
        // Set world background (dark forest green outside the lodge)
        this.cameras.main.setBackgroundColor('#0a1f0a');
        
        // Camera follow player with appropriate zoom
        this.cameras.main.startFollow(this.player);
        const zoom = window.isMobile ? 1.5 : 1.2;
        this.cameras.main.setZoom(zoom);
        
        // Create particles
        this.createParticles();
        
        // Update room name initially
        this.updateCurrentRoom();
        
        console.log('🎮 Game scene created successfully!');
    }
    
    createRooms() {
        this.roomGraphics = this.add.group();
        this.wallsGroup = this.physics.add.staticGroup();
        
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            const x = room.x;
            const y = room.y;
            const w = this.roomWidth;
            const h = this.roomHeight;
            const wallT = this.wallThickness;
            
            // Room floor with distinct color per room
            const floor = this.add.rectangle(x, y, w, h, parseInt(room.color.replace('#', '0x')));
            
            // Room label INSIDE the room, at the top
            const label = this.add.text(x, y - h/2 + 40, roomName, {
                fontSize: '16px',
                fontFamily: 'Courier New, monospace',
                color: '#e6d3a3',
                fontWeight: 'bold',
                backgroundColor: 'rgba(45, 24, 16, 0.8)',
                padding: { x: 10, y: 6 }
            }).setOrigin(0.5);
            
            this.roomGraphics.add(floor);
            this.roomGraphics.add(label);
        });
        
        // Create walls with collision
        this.createWalls();
        
        // Set world bounds to match the lodge size (~1300x1000)
        this.physics.world.setBounds(0, 0, 1300, 1000);
    }
    
    createWalls() {
        const wallColor = 0x2F1B14;
        const wallT = this.wallThickness;
        const doorwayWidth = 60;
        
        // Helper function to create wall segment
        const createWall = (x, y, width, height) => {
            const wall = this.add.rectangle(x, y, width, height, wallColor);
            this.physics.add.existing(wall, true); // true = static
            this.wallsGroup.add(wall);
        };
        
        // Room positions for easier reference
        const rooms = [
            { x: 230, y: 180 }, { x: 630, y: 180 }, { x: 1030, y: 180 }, // Top row
            { x: 230, y: 480 }, { x: 630, y: 480 }, { x: 1030, y: 480 }, // Middle row
            { x: 230, y: 780 }, { x: 630, y: 780 }, { x: 1030, y: 780 }  // Bottom row
        ];
        
        // Create outer walls of the entire lodge
        // Top wall
        createWall(630, 30, 1200, wallT);
        // Bottom wall
        createWall(630, 930, 1200, wallT);
        // Left wall
        createWall(30, 480, wallT, 840);
        // Right wall
        createWall(1230, 480, wallT, 840);
        
        // Create internal walls with doorways
        // Horizontal walls between room rows
        rooms.forEach((room, i) => {
            if (i < 6) { // Not bottom row
                const y = room.y + this.roomHeight/2 + wallT/2;
                // Left segment of wall
                createWall(room.x - this.roomWidth/2 + (this.roomWidth - doorwayWidth)/4, y, (this.roomWidth - doorwayWidth)/2, wallT);
                // Right segment of wall
                createWall(room.x + this.roomWidth/2 - (this.roomWidth - doorwayWidth)/4, y, (this.roomWidth - doorwayWidth)/2, wallT);
            }
        });
        
        // Vertical walls between room columns
        rooms.forEach((room, i) => {
            if (i % 3 !== 2) { // Not rightmost column
                const x = room.x + this.roomWidth/2 + wallT/2;
                // Top segment of wall
                createWall(x, room.y - this.roomHeight/2 + (this.roomHeight - doorwayWidth)/4, wallT, (this.roomHeight - doorwayWidth)/2);
                // Bottom segment of wall
                createWall(x, room.y + this.roomHeight/2 - (this.roomHeight - doorwayWidth)/4, wallT, (this.roomHeight - doorwayWidth)/2);
            }
        });
        
        // Set up collision between player and walls
        this.physics.add.collider(this.player, this.wallsGroup);
    }
    
    createInteractiveObjects() {
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            if (room.object.type === 'spawn') return; // Skip spawn point
            
            // Create glowing object (30px radius)
            const obj = this.add.circle(room.object.x, room.object.y, 30, this.getObjectColor(room.object.type));
            obj.setStrokeStyle(4, 0xFF8C00);
            
            // Add emoji icon label on top of object
            const emoji = this.getObjectEmoji(room.object.type);
            const label = this.add.text(room.object.x, room.object.y, emoji, {
                fontSize: '24px',
                fontFamily: 'Arial, sans-serif'
            }).setOrigin(0.5);
            
            // Add physics
            this.physics.add.existing(obj);
            obj.body.setImmovable(true);
            obj.roomName = roomName;
            obj.objectType = room.object.type;
            obj.emoji = label; // Store reference to label
            
            this.interactiveObjects.add(obj);
            
            // Add dramatic glow animation
            this.tweens.add({
                targets: obj,
                alpha: { from: 0.5, to: 1.0 },
                scaleX: { from: 0.9, to: 1.1 },
                scaleY: { from: 0.9, to: 1.1 },
                duration: 1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Also animate the emoji label
            this.tweens.add({
                targets: label,
                y: { from: room.object.y - 5, to: room.object.y + 5 },
                duration: 2500,
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
    
    getObjectEmoji(type) {
        const emojis = {
            fireplace: '🔥',
            desk: '📋',
            bunks: '🛏️',
            safe: '💰',
            radio: '📡',
            jukebox: '🎵',
            bookshelf: '📚',
            monitors: '📷'
        };
        return emojis[type] || '❓';
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
        // Create floating dust particles for atmosphere within the lodge area
        for (let i = 0; i < 60; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(50, 1250),
                Phaser.Math.Between(50, 950),
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
        
        // Update player label position (centered on player)
        this.playerLabel.setPosition(this.player.x, this.player.y);
        
        // Update player trail effect
        if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
            // Show trail when moving
            this.playerTrail.forEach((trail, index) => {
                trail.visible = true;
                const delay = (index + 1) * 50; // Stagger the trail
                this.time.delayedCall(delay, () => {
                    trail.setPosition(this.player.x, this.player.y);
                });
            });
        } else {
            // Hide trail when stationary
            this.playerTrail.forEach(trail => {
                trail.visible = false;
            });
        }
        
        // Check room changes and nearby objects
        this.updateCurrentRoom();
        this.checkNearbyObjects();
    }
    
    updateCurrentRoom() {
        let newRoom = null;
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            // Check if player is within room bounds (400x300 rooms)
            if (playerX >= room.x - this.roomWidth/2 && playerX <= room.x + this.roomWidth/2 &&
                playerY >= room.y - this.roomHeight/2 && playerY <= room.y + this.roomHeight/2) {
                newRoom = roomName;
            }
        });
        
        if (newRoom && newRoom !== this.currentRoom) {
            this.currentRoom = newRoom;
            document.getElementById('room-name').textContent = this.currentRoom;
            
            // Update minimap when room changes
            if (window.lodgeUI) {
                window.lodgeUI.updateMinimap(this.currentRoom, this.player.x, this.player.y);
            }
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