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
            'Training Room': { x: 230, y: 180, object: { x: 230, y: 180, type: 'training' }, color: '#3d2214', baseColor: 0x3d2214 },
            'War Room': { x: 630, y: 180, object: { x: 630, y: 180, type: 'desk' }, color: '#3e2415', baseColor: 0x3e2415 },
            'Barracks': { x: 1030, y: 180, object: { x: 1030, y: 180, type: 'bunks' }, color: '#3f2516', baseColor: 0x3f2516 },
            'Treasury': { x: 230, y: 480, object: { x: 230, y: 480, type: 'safe' }, color: '#402617', baseColor: 0x402617 },
            'Main Hall': { x: 630, y: 480, object: { x: 630, y: 480, type: 'dashboard' }, color: '#412718', baseColor: 0x412718 },
            'Command Center': { x: 1030, y: 480, object: { x: 1030, y: 480, type: 'radio' }, color: '#422819', baseColor: 0x422819 },
            'Lounge': { x: 230, y: 780, object: { x: 230, y: 780, type: 'jukebox' }, color: '#43291a', baseColor: 0x43291a },
            'Library': { x: 630, y: 780, object: { x: 630, y: 780, type: 'bookshelf' }, color: '#442a1b', baseColor: 0x442a1b },
            'Watchtower': { x: 1030, y: 780, object: { x: 1030, y: 780, type: 'monitors' }, color: '#452b1c', baseColor: 0x452b1c }
        };
        
        this.currentRoom = 'Main Hall';
        this.nearObject = null;
        this.particles = [];
        this.ambientParticles = [];
        this.lightSources = [];
        this.shadows = [];
        this.roomTransitioning = false;
    }
    
    preload() {
        // Create procedural textures for wood and stone
        this.createWoodTexture();
        this.createStoneTexture();
        this.createMetalTexture();
        this.createLeatherTexture();
    }
    
    createWoodTexture() {
        // Procedural wood grain texture
        const graphics = this.add.graphics();
        const texture = this.textures.createCanvas('wood', 256, 256);
        const canvas = texture.getSourceImage();
        const ctx = canvas.getContext('2d');
        
        // Base wood color
        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
        gradient.addColorStop(0, '#5D3A1A');
        gradient.addColorStop(0.3, '#6B4423');
        gradient.addColorStop(0.7, '#7A502C');
        gradient.addColorStop(1, '#8B5A2B');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        // Add wood grain lines
        for (let i = 0; i < 50; i++) {
            const y = (i / 50) * 256;
            const wave = Math.sin(y * 0.02) * 10;
            const opacity = 0.1 + Math.random() * 0.2;
            
            ctx.strokeStyle = `rgba(45, 30, 15, ${opacity})`;
            ctx.lineWidth = 1 + Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(wave, y);
            ctx.lineTo(256 + wave, y);
            ctx.stroke();
        }
        
        // Add knots and variations
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const radius = 10 + Math.random() * 20;
            
            ctx.fillStyle = `rgba(45, 30, 15, 0.3)`;
            ctx.beginPath();
            ctx.ellipse(x, y, radius, radius * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
        
        texture.refresh();
        graphics.destroy();
    }
    
    createStoneTexture() {
        const texture = this.textures.createCanvas('stone', 256, 256);
        const canvas = texture.getSourceImage();
        const ctx = canvas.getContext('2d');
        
        // Base stone color
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(0, 0, 256, 256);
        
        // Add stone texture with noise
        for (let x = 0; x < 256; x += 2) {
            for (let y = 0; y < 256; y += 2) {
                const brightness = 0.3 + Math.random() * 0.4;
                const color = Math.floor(74 * brightness);
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x, y, 2, 2);
            }
        }
        
        // Add cracks and details
        for (let i = 0; i < 20; i++) {
            ctx.strokeStyle = `rgba(30, 30, 30, ${0.3 + Math.random() * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(Math.random() * 256, Math.random() * 256);
            ctx.lineTo(Math.random() * 256, Math.random() * 256);
            ctx.stroke();
        }
        
        texture.refresh();
    }
    
    createMetalTexture() {
        const texture = this.textures.createCanvas('metal', 256, 256);
        const canvas = texture.getSourceImage();
        const ctx = canvas.getContext('2d');
        
        // Base metal color (brass/bronze)
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#CD7F32');
        gradient.addColorStop(0.5, '#B8860B');
        gradient.addColorStop(1, '#DAA520');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        // Add metallic shine
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const size = 2 + Math.random() * 8;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.ellipse(x, y, size, size * 0.3, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
        
        texture.refresh();
    }
    
    createLeatherTexture() {
        const texture = this.textures.createCanvas('leather', 256, 256);
        const canvas = texture.getSourceImage();
        const ctx = canvas.getContext('2d');
        
        // Base leather color
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 256, 256);
        
        // Add leather grain
        for (let x = 0; x < 256; x += 3) {
            for (let y = 0; y < 256; y += 3) {
                const variation = -20 + Math.random() * 40;
                const r = Math.max(0, Math.min(255, 139 + variation));
                const g = Math.max(0, Math.min(255, 69 + variation));
                const b = Math.max(0, Math.min(255, 19 + variation));
                
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, y, 3, 3);
            }
        }
        
        texture.refresh();
    }
    
    create() {
        // Create ambient lighting
        this.createAmbientLighting();
        
        // Create room graphics with enhanced visuals
        this.createRooms();
        
        // Create enhanced player with trail effects
        this.createPlayer();
        
        // Create interactive objects with modern styling
        this.interactiveObjects = this.physics.add.group();
        this.createInteractiveObjects();
        
        // Setup input
        this.setupInput();
        
        // Setup mobile controls if needed
        if (window.isMobile) {
            this.setupMobileControls();
        }
        
        // Set world background with gradient
        this.createWorldBackground();
        
        // Camera setup with smooth following
        this.setupCamera();
        
        // Create atmospheric particles
        this.createAtmosphericParticles();
        
        // Create lighting system
        this.createLightingSystem();
        
        // Update room name initially
        this.updateCurrentRoom();
        
        console.log('🎮 Enhanced Lodge scene created successfully!');
    }
    
    createAmbientLighting() {
        // Create a subtle ambient light overlay
        this.ambientLight = this.add.rectangle(650, 500, 1300, 1000, 0x000000, 0.3);
        this.ambientLight.setBlendMode(Phaser.BlendModes.MULTIPLY);
    }
    
    createWorldBackground() {
        // Create a rich gradient background
        const graphics = this.add.graphics();
        
        // Outer forest area - dark gradient
        graphics.fillGradientStyle(0x0a1f0a, 0x0a1f0a, 0x162a16, 0x162a16, 1);
        graphics.fillRect(0, 0, 1300, 1000);
        
        // Lodge foundation shadow
        graphics.fillStyle(0x000000, 0.4);
        graphics.fillRect(25, 25, 1250, 950);
        
        // Lodge perimeter with warm glow
        graphics.fillGradientStyle(0x5a3a2a, 0x4a2a1a, 0x3a1a0a, 0x2a1a0a, 1);
        graphics.fillRect(30, 30, 1240, 940);
        
        this.worldBackground = graphics;
    }
    
    createPlayer() {
        // Enhanced player with glow and better trail
        this.player = this.add.circle(630, 480, 18, 0x32cd32);
        
        // Add glow effect to player
        this.playerGlow = this.add.circle(630, 480, 25, 0x32cd32, 0.3);
        this.playerGlow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Player label with better styling
        this.playerLabel = this.add.text(630, 480, 'M', {
            fontSize: '20px',
            fontFamily: 'Arial Black, sans-serif',
            color: '#ffffff',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Enable physics for player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(36, 36);
        
        // Create enhanced trail effect (5 fading circles with glow)
        this.playerTrail = [];
        for (let i = 0; i < 5; i++) {
            const trailCircle = this.add.circle(630, 480, 16 - i * 2, 0x32cd32, 0.8 - i * 0.15);
            trailCircle.visible = false;
            trailCircle.setBlendMode(Phaser.BlendModes.ADD);
            this.playerTrail.push(trailCircle);
        }
    }
    
    createRooms() {
        this.roomGraphics = this.add.group();
        this.wallsGroup = this.physics.add.staticGroup();
        this.roomFloors = this.add.group();
        
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            const x = room.x;
            const y = room.y;
            const w = this.roomWidth;
            const h = this.roomHeight;
            
            // Create layered floor with depth
            this.createRoomFloor(x, y, w, h, room);
            
            // Create room ambience
            this.createRoomAmbience(x, y, w, h, room);
            
            // Room label with enhanced styling
            const labelBg = this.add.rectangle(x, y - h/2 + 35, 200, 30, 0x2d1810, 0.9);
            labelBg.setStroke(0x8b4513, 2);
            
            const label = this.add.text(x, y - h/2 + 35, roomName, {
                fontSize: '16px',
                fontFamily: 'Arial Black, sans-serif',
                color: '#e6d3a3',
                fontWeight: 'bold',
                stroke: '#2d1810',
                strokeThickness: 2
            }).setOrigin(0.5);
            
            this.roomGraphics.add(labelBg);
            this.roomGraphics.add(label);
        });
        
        // Create enhanced walls with depth and texture
        this.createEnhancedWalls();
        
        // Set world bounds to match the lodge size (~1300x1000)
        this.physics.world.setBounds(0, 0, 1300, 1000);
    }
    
    createRoomFloor(x, y, w, h, room) {
        // Base floor with wood texture
        const floorBase = this.add.tileSprite(x, y, w, h, 'wood');
        floorBase.setTint(room.baseColor);
        
        // Floor pattern overlay
        const floorPattern = this.add.graphics();
        floorPattern.lineStyle(1, 0x000000, 0.1);
        
        // Create wooden plank lines
        const plankHeight = 25;
        for (let i = -h/2; i < h/2; i += plankHeight) {
            const lineY = y + i;
            floorPattern.moveTo(x - w/2, lineY);
            floorPattern.lineTo(x + w/2, lineY);
        }
        floorPattern.strokePath();
        
        // Add subtle room lighting gradient
        const roomLight = this.add.graphics();
        roomLight.fillGradientStyle(
            room.baseColor, room.baseColor, 
            Phaser.Display.Color.GetColor32(0, 0, 0, 0.3), Phaser.Display.Color.GetColor32(0, 0, 0, 0.3), 
            0.7
        );
        roomLight.fillRect(x - w/2, y - h/2, w, h);
        roomLight.setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        this.roomFloors.add(floorBase);
        this.roomFloors.add(floorPattern);
        this.roomFloors.add(roomLight);
    }
    
    createRoomAmbience(x, y, w, h, room) {
        // Create room-specific lighting effects
        const roomGlow = this.add.circle(x, y, Math.max(w, h) * 0.6, 0xffa500, 0.05);
        roomGlow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Add corner shadows for depth
        const cornerShadows = this.add.graphics();
        cornerShadows.fillStyle(0x000000, 0.4);
        
        // Corner shadow triangles
        const shadowSize = 40;
        cornerShadows.fillTriangle(
            x - w/2, y - h/2,
            x - w/2 + shadowSize, y - h/2,
            x - w/2, y - h/2 + shadowSize
        );
        cornerShadows.fillTriangle(
            x + w/2, y - h/2,
            x + w/2 - shadowSize, y - h/2,
            x + w/2, y - h/2 + shadowSize
        );
        cornerShadows.fillTriangle(
            x - w/2, y + h/2,
            x - w/2 + shadowSize, y + h/2,
            x - w/2, y + h/2 - shadowSize
        );
        cornerShadows.fillTriangle(
            x + w/2, y + h/2,
            x + w/2 - shadowSize, y + h/2,
            x + w/2, y + h/2 - shadowSize
        );
        
        this.roomGraphics.add(roomGlow);
        this.roomGraphics.add(cornerShadows);
    }
    
    createEnhancedWalls() {
        const wallT = this.wallThickness;
        
        // Helper function to create textured wall segment with depth
        const createEnhancedWall = (x, y, width, height) => {
            // Wall shadow (depth effect)
            const shadow = this.add.rectangle(x + 2, y + 2, width, height, 0x000000, 0.5);
            
            // Main wall with stone texture
            const wall = this.add.tileSprite(x, y, width, height, 'stone');
            wall.setTint(0x2F1B14);
            
            // Wall highlight for 3D effect
            const highlight = this.add.rectangle(x - 1, y - 1, width - 2, height - 2, 0x000000, 0);
            highlight.setStrokeStyle(1, 0x8b4513, 0.6);
            
            // Add to physics
            this.physics.add.existing(wall, true);
            this.wallsGroup.add(wall);
            
            return { shadow, wall, highlight };
        };
        
        // Room positions for easier reference
        const rooms = [
            { x: 230, y: 180 }, { x: 630, y: 180 }, { x: 1030, y: 180 }, // Top row
            { x: 230, y: 480 }, { x: 630, y: 480 }, { x: 1030, y: 480 }, // Middle row
            { x: 230, y: 780 }, { x: 630, y: 780 }, { x: 1030, y: 780 }  // Bottom row
        ];
        
        const doorwayWidth = 60;
        
        // Create outer walls of the entire lodge
        createEnhancedWall(630, 30, 1200, wallT);
        createEnhancedWall(630, 930, 1200, wallT);
        createEnhancedWall(30, 480, wallT, 840);
        createEnhancedWall(1230, 480, wallT, 840);
        
        // Create internal walls with doorways
        rooms.forEach((room, i) => {
            if (i < 6) { // Not bottom row
                const y = room.y + this.roomHeight/2 + wallT/2;
                createEnhancedWall(room.x - this.roomWidth/2 + (this.roomWidth - doorwayWidth)/4, y, (this.roomWidth - doorwayWidth)/2, wallT);
                createEnhancedWall(room.x + this.roomWidth/2 - (this.roomWidth - doorwayWidth)/4, y, (this.roomWidth - doorwayWidth)/2, wallT);
            }
        });
        
        // Vertical walls between room columns
        rooms.forEach((room, i) => {
            if (i % 3 !== 2) { // Not rightmost column
                const x = room.x + this.roomWidth/2 + wallT/2;
                createEnhancedWall(x, room.y - this.roomHeight/2 + (this.roomHeight - doorwayWidth)/4, wallT, (this.roomHeight - doorwayWidth)/2);
                createEnhancedWall(x, room.y + this.roomHeight/2 - (this.roomHeight - doorwayWidth)/4, wallT, (this.roomHeight - doorwayWidth)/2);
            }
        });
        
        // Set up collision between player and walls
        this.physics.add.collider(this.player, this.wallsGroup);
    }
    
    createInteractiveObjects() {
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            if (room.object.type === 'spawn') return; // Skip spawn point
            
            // Create enhanced interactive object with multiple layers
            this.createEnhancedObject(room, roomName);
        });
    }
    
    createEnhancedObject(room, roomName) {
        const x = room.object.x;
        const y = room.object.y;
        const type = room.object.type;
        const baseColor = this.getObjectColor(type);
        
        // Object shadow
        const shadowOffset = 5;
        const shadow = this.add.ellipse(x + shadowOffset, y + shadowOffset, 70, 35, 0x000000, 0.4);
        
        // Base object with texture based on type
        const obj = this.add.circle(x, y, 30, baseColor);
        if (this.getObjectTexture(type)) {
            obj.setTexture(this.getObjectTexture(type));
        }
        
        // Glow effect
        const glow = this.add.circle(x, y, 35, baseColor, 0.3);
        glow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Highlight ring
        const highlight = this.add.circle(x, y, 32, 0x000000, 0);
        highlight.setStrokeStyle(3, 0xffd700, 0.8);
        
        // Enhanced emoji icon with shadow
        const emoji = this.getObjectEmoji(type);
        const emojiShadow = this.add.text(x + 1, y + 1, emoji, {
            fontSize: '26px',
            fontFamily: 'Arial, sans-serif',
            color: '#000000'
        }).setOrigin(0.5).setAlpha(0.3);
        
        const emojiLabel = this.add.text(x, y, emoji, {
            fontSize: '26px',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        // Create particle effects for certain objects
        if (type === 'training') {
            this.createTrainingEffect(x, y);
        } else if (type === 'monitors') {
            this.createAlertEffect(x, y);
        }
        
        // Add physics
        this.physics.add.existing(obj);
        obj.body.setImmovable(true);
        obj.roomName = roomName;
        obj.objectType = type;
        obj.emoji = emojiLabel;
        obj.glow = glow;
        obj.highlight = highlight;
        obj.shadow = shadow;
        
        this.interactiveObjects.add(obj);
        
        // Enhanced pulsing animation
        this.tweens.add({
            targets: [glow, highlight],
            alpha: { from: 0.8, to: 0.3 },
            scaleX: { from: 1.0, to: 1.2 },
            scaleY: { from: 1.0, to: 1.2 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Floating animation for emoji
        this.tweens.add({
            targets: [emojiLabel, emojiShadow],
            y: { from: y - 3, to: y + 3 },
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Rotating highlight effect
        this.tweens.add({
            targets: highlight,
            rotation: Math.PI * 2,
            duration: 8000,
            repeat: -1,
            ease: 'Linear'
        });
    }
    
    createTrainingEffect(x, y) {
        // Create training energy particles (representing workout intensity)
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const energy = this.add.circle(
                    x + (Math.random() - 0.5) * 25,
                    y + 5,
                    1 + Math.random() * 2,
                    Phaser.Math.RND.pick([0xff4500, 0xff8c00, 0xffd700]),
                    0.7
                );
                
                energy.setBlendMode(Phaser.BlendModes.ADD);
                
                this.tweens.add({
                    targets: energy,
                    y: y - 30 - Math.random() * 25,
                    x: x + (Math.random() - 0.5) * 35,
                    alpha: 0,
                    duration: 1500 + Math.random() * 800,
                    ease: 'Quad.easeOut',
                    onComplete: () => energy.destroy()
                });
            }, Math.random() * 2500);
        }
        
        // Repeat the effect
        setTimeout(() => this.createTrainingEffect(x, y), 3500);
    }
    
    createAlertEffect(x, y) {
        // Create alert pulse particles for monitoring station
        const alert = this.add.circle(x, y, 8, 0xff4444, 0.6);
        alert.setBlendMode(Phaser.BlendModes.ADD);
        
        this.tweens.add({
            targets: alert,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 1000,
            ease: 'Quad.easeOut',
            onComplete: () => {
                alert.destroy();
                // Repeat with random timing
                setTimeout(() => this.createAlertEffect(x, y), 2000 + Math.random() * 3000);
            }
        });
    }
    
    createAtmosphericParticles() {
        // Create floating dust motes for atmosphere within the lodge area
        for (let i = 0; i < 80; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(50, 1250),
                Phaser.Math.Between(50, 950),
                Phaser.Math.Between(1, 3),
                0xDDDDDD,
                Phaser.Math.FloatBetween(0.1, 0.3)
            );
            
            particle.setBlendMode(Phaser.BlendModes.ADD);
            
            this.tweens.add({
                targets: particle,
                y: particle.y - Phaser.Math.Between(30, 100),
                x: particle.x + (Math.random() - 0.5) * 50,
                alpha: { from: particle.alpha, to: 0.05 },
                duration: Phaser.Math.Between(15000, 25000),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
            
            this.ambientParticles.push(particle);
        }
    }
    
    createLightingSystem() {
        // Create dynamic lighting for each room
        Object.entries(this.rooms).forEach(([roomName, room]) => {
            // Warm lodge lighting
            const lightSource = this.add.circle(room.x, room.y - 50, 150, 0xffa500, 0.1);
            lightSource.setBlendMode(Phaser.BlendModes.ADD);
            
            // Flickering animation
            this.tweens.add({
                targets: lightSource,
                alpha: { from: 0.08, to: 0.15 },
                scaleX: { from: 0.9, to: 1.1 },
                scaleY: { from: 0.9, to: 1.1 },
                duration: 3000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.lightSources.push(lightSource);
        });
    }
    
    setupCamera() {
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        const zoom = window.isMobile ? 1.5 : 1.2;
        this.cameras.main.setZoom(zoom);
        
        // Add subtle camera shake for immersion
        this.time.addEvent({
            delay: 8000,
            callback: () => {
                this.cameras.main.shake(50, 0.002);
            },
            loop: true
        });
    }
    
    getObjectColor(type) {
        const colors = {
            training: 0xFF4500,
            desk: 0xFF6B35,
            bunks: 0x4682B4,
            safe: 0xFFD700,
            dashboard: 0x32CD32,
            radio: 0x00CED1,
            jukebox: 0xFF1493,
            bookshelf: 0x8B4513,
            monitors: 0xFF4444
        };
        return colors[type] || 0xFF8C00;
    }
    
    getObjectTexture(type) {
        const textures = {
            training: 'metal',
            desk: 'wood',
            bunks: 'leather',
            safe: 'metal',
            dashboard: 'stone',
            radio: 'metal',
            jukebox: 'metal',
            bookshelf: 'wood',
            monitors: 'metal'
        };
        return textures[type] || null;
    }
    
    getObjectEmoji(type) {
        const emojis = {
            training: '🏋️',
            desk: '🎯',
            bunks: '👥',
            safe: '💰',
            dashboard: '📊',
            radio: '📧',
            jukebox: '🎵',
            bookshelf: '📚',
            monitors: '⚠️'
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
    
    update() {
        // Player movement
        const speed = 160;
        let velocityX = 0;
        let velocityY = 0;
        
        if (window.isMobile && (this.joystickData.x !== 0 || this.joystickData.y !== 0)) {
            // Mobile joystick movement
            velocityX = this.joystickData.x * speed;
            velocityY = this.joystickData.y * speed;
        } else {
            // Keyboard movement
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
        }
        
        this.player.body.setVelocity(velocityX, velocityY);
        
        // Update player glow position
        this.playerGlow.setPosition(this.player.x, this.player.y);
        
        // Update player label position (centered on player)
        this.playerLabel.setPosition(this.player.x, this.player.y);
        
        // Enhanced player trail effect
        const isMoving = velocityX !== 0 || velocityY !== 0;
        if (isMoving) {
            // Show and update trail when moving
            this.playerTrail.forEach((trail, index) => {
                trail.visible = true;
                const delay = (index + 1) * 60; // Stagger the trail more smoothly
                this.time.delayedCall(delay, () => {
                    trail.setPosition(this.player.x, this.player.y);
                });
            });
            
            // Create movement particles
            if (Math.random() < 0.3) {
                const dust = this.add.circle(
                    this.player.x + (Math.random() - 0.5) * 20,
                    this.player.y + 15,
                    2,
                    0x8b4513,
                    0.6
                );
                
                this.tweens.add({
                    targets: dust,
                    alpha: 0,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    duration: 500,
                    onComplete: () => dust.destroy()
                });
            }
        } else {
            // Hide trail when stationary
            this.playerTrail.forEach(trail => {
                trail.visible = false;
            });
        }
        
        // Check room changes and nearby objects
        this.updateCurrentRoom();
        this.checkNearbyObjects();
        
        // Update interactive object hover effects
        this.updateObjectHoverEffects();
    }
    
    updateObjectHoverEffects() {
        this.interactiveObjects.children.entries.forEach(obj => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, obj.x, obj.y);
            if (distance < 80) {
                // Player is near - enhance glow
                obj.glow.setAlpha(0.6);
                obj.highlight.setAlpha(1.0);
            } else {
                // Normal glow
                obj.glow.setAlpha(0.3);
                obj.highlight.setAlpha(0.8);
            }
        });
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
            this.transitionToRoom(newRoom);
        }
    }
    
    transitionToRoom(newRoom) {
        if (this.roomTransitioning) return;
        
        this.roomTransitioning = true;
        this.currentRoom = newRoom;
        
        // Smooth room transition effect
        const overlay = this.add.rectangle(650, 500, 1300, 1000, 0x000000, 0);
        
        this.tweens.add({
            targets: overlay,
            alpha: 0.3,
            duration: 200,
            yoyo: true,
            onComplete: () => {
                overlay.destroy();
                this.roomTransitioning = false;
            }
        });
        
        // Update UI
        document.getElementById('room-name').textContent = this.currentRoom;
        
        // Update minimap when room changes
        if (window.lodgeUI) {
            window.lodgeUI.updateMinimap(this.currentRoom, this.player.x, this.player.y);
        }
        
        // Room-specific lighting adjustments
        this.adjustRoomLighting(newRoom);
    }
    
    adjustRoomLighting(roomName) {
        // Adjust ambient lighting based on room
        const room = this.rooms[roomName];
        if (!room) return;
        
        const lightingMap = {
            'Training Room': 0.2,  // Brighter for workout energy
            'Main Hall': 0.25,     // Bright for dashboard visibility
            'War Room': 0.35,      // Darker for focus
            'Watchtower': 0.4,     // Darkest for monitoring
            'Treasury': 0.3,       // Moderate for focus
            'Command Center': 0.25, // Bright for productivity
            'Barracks': 0.3,       // Moderate for reports
            'Library': 0.3,        // Good reading light
            'Lounge': 0.2          // Bright for relaxation
        };
        
        this.tweens.add({
            targets: this.ambientLight,
            alpha: lightingMap[roomName] || 0.3,
            duration: 1000,
            ease: 'Sine.easeInOut'
        });
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
            // Create interaction effect
            const effect = this.add.circle(this.nearObject.x, this.nearObject.y, 10, 0xffd700, 0.8);
            effect.setBlendMode(Phaser.BlendModes.ADD);
            
            this.tweens.add({
                targets: effect,
                scaleX: 3,
                scaleY: 3,
                alpha: 0,
                duration: 300,
                onComplete: () => effect.destroy()
            });
            
            window.lodgeUI.openPanel(this.nearObject.roomName, this.nearObject.objectType);
        }
    }
}