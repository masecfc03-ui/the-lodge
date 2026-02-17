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
            'Training Room': { x: 230, y: 180, object: { x: 230, y: 180, type: 'training' }, color: '#5D4037', baseColor: 0x5D4037 },
            'War Room': { x: 630, y: 180, object: { x: 630, y: 180, type: 'desk' }, color: '#6D4C41', baseColor: 0x6D4C41 },
            'Barracks': { x: 1030, y: 180, object: { x: 1030, y: 180, type: 'bunks' }, color: '#5D4037', baseColor: 0x5D4037 },
            'Treasury': { x: 230, y: 480, object: { x: 230, y: 480, type: 'safe' }, color: '#8D6E63', baseColor: 0x8D6E63 },
            'Main Hall': { x: 630, y: 480, object: { x: 630, y: 480, type: 'dashboard' }, color: '#6D4C41', baseColor: 0x6D4C41 },
            'Command Center': { x: 1030, y: 480, object: { x: 1030, y: 480, type: 'radio' }, color: '#5D4037', baseColor: 0x5D4037 },
            'Lounge': { x: 230, y: 780, object: { x: 230, y: 780, type: 'jukebox' }, color: '#8D6E63', baseColor: 0x8D6E63 },
            'Library': { x: 630, y: 780, object: { x: 630, y: 780, type: 'bookshelf' }, color: '#6D4C41', baseColor: 0x6D4C41 },
            'Watchtower': { x: 1030, y: 780, object: { x: 1030, y: 780, type: 'monitors' }, color: '#5D4037', baseColor: 0x5D4037 }
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
        
        // Create lodge atmosphere
        this.createLodgeTexture();
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
    
    createLodgeTexture() {
        const texture = this.textures.createCanvas('lodge_floor', 512, 512);
        const canvas = texture.getSourceImage();
        const ctx = canvas.getContext('2d');
        
        // Rich wood floor with multiple tones
        const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 350);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.3, '#A0522D');
        gradient.addColorStop(0.6, '#654321');
        gradient.addColorStop(1, '#3E2723');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        // Add rich wood planks
        for (let y = 0; y < 512; y += 64) {
            const plankShade = 0.9 + Math.random() * 0.2;
            ctx.fillStyle = `rgba(139, 69, 19, ${plankShade})`;
            ctx.fillRect(0, y, 512, 60);
            
            // Plank details
            ctx.strokeStyle = `rgba(62, 39, 35, 0.6)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(512, y);
            ctx.stroke();
            
            // Wood grain
            for (let i = 0; i < 8; i++) {
                const grainY = y + Math.random() * 60;
                const grainOpacity = 0.1 + Math.random() * 0.2;
                ctx.strokeStyle = `rgba(62, 39, 35, ${grainOpacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, grainY);
                ctx.lineTo(512, grainY);
                ctx.stroke();
            }
        }
        
        // Add warm lighting overlay
        const lightGradient = ctx.createRadialGradient(256, 256, 100, 256, 256, 300);
        lightGradient.addColorStop(0, 'rgba(255, 165, 0, 0.15)');
        lightGradient.addColorStop(1, 'rgba(255, 140, 0, 0.05)');
        
        ctx.fillStyle = lightGradient;
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillRect(0, 0, 512, 512);
        ctx.globalCompositeOperation = 'source-over';
        
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
        // Create a sophisticated lodge environment
        const graphics = this.add.graphics();
        
        // Rich forest environment
        graphics.fillGradientStyle(0x0F2027, 0x0F2027, 0x203A43, 0x2C5364, 0.95);
        graphics.fillRect(0, 0, 1300, 1000);
        
        // Add environmental depth layers
        graphics.fillGradientStyle(0x1a332e, 0x1a332e, 0x0d1f1a, 0x0d1f1a, 0.8);
        graphics.fillRect(0, 0, 1300, 200); // Top tree line
        
        graphics.fillGradientStyle(0x1a332e, 0x1a332e, 0x0d1f1a, 0x0d1f1a, 0.6);
        graphics.fillRect(0, 800, 1300, 200); // Bottom tree line
        
        // Lodge foundation with professional lighting
        const foundationShadow = this.add.graphics();
        foundationShadow.fillStyle(0x000000, 0.5);
        foundationShadow.fillRoundedRect(20, 20, 1260, 960, 15);
        foundationShadow.setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        // Main lodge structure
        graphics.fillGradientStyle(0x5D4037, 0x4E342E, 0x3E2723, 0x2E1E17, 0.95);
        graphics.fillRoundedRect(30, 30, 1240, 940, 10);
        
        // Lodge exterior trim
        graphics.lineStyle(3, 0x8D6E63, 0.8);
        graphics.strokeRoundedRect(30, 30, 1240, 940, 10);
        
        // Professional exterior lighting
        const exteriorLights = [
            { x: 150, y: 50 }, { x: 650, y: 50 }, { x: 1150, y: 50 },
            { x: 50, y: 300 }, { x: 1250, y: 300 },
            { x: 50, y: 700 }, { x: 1250, y: 700 },
            { x: 150, y: 950 }, { x: 650, y: 950 }, { x: 1150, y: 950 }
        ];
        
        exteriorLights.forEach(light => {
            const lightGlow = this.add.circle(light.x, light.y, 80, 0xFFB74D, 0.08);
            lightGlow.setBlendMode(Phaser.BlendModes.ADD);
            
            const lightBulb = this.add.circle(light.x, light.y, 6, 0xFFF9C4, 0.9);
            lightBulb.setStroke(0xFFB74D, 2);
            
            // Gentle flickering
            this.tweens.add({
                targets: [lightGlow, lightBulb],
                alpha: { from: lightGlow.alpha, to: lightGlow.alpha * 1.3 },
                duration: 3000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        
        // Add professional pathways
        this.createProfessionalPathways(graphics);
        
        this.worldBackground = graphics;
    }
    
    createProfessionalPathways(graphics) {
        // Main entrance pathway
        graphics.fillStyle(0x6D4C41, 0.8);
        graphics.fillRoundedRect(600, 30, 100, 50, 5);
        
        // Interior corridors (subtle)
        graphics.lineStyle(2, 0x5D4037, 0.4);
        
        // Horizontal corridors
        graphics.moveTo(30, 330);
        graphics.lineTo(1270, 330);
        graphics.moveTo(30, 630);
        graphics.lineTo(1270, 630);
        
        // Vertical corridors  
        graphics.moveTo(430, 30);
        graphics.lineTo(430, 970);
        graphics.moveTo(830, 30);
        graphics.lineTo(830, 970);
        
        graphics.strokePath();
        
        // Professional corner accents
        const corners = [
            [30, 30], [1270, 30], [30, 970], [1270, 970]
        ];
        
        corners.forEach(([x, y]) => {
            graphics.fillStyle(0x8D6E63, 0.6);
            graphics.fillRoundedRect(x - 15, y - 15, 30, 30, 8);
            
            graphics.lineStyle(2, 0xFFB74D, 0.7);
            graphics.strokeRoundedRect(x - 15, y - 15, 30, 30, 8);
        });
    }
    
    createPlayer() {
        // Professional player avatar with modern design
        const playerBase = this.add.graphics();
        playerBase.x = 630;
        playerBase.y = 480;
        
        // Modern circular base with gradient
        playerBase.fillGradientStyle(0x32CD32, 0x32CD32, 0x228B22, 0x228B22, 0.9);
        playerBase.fillCircle(0, 0, 18);
        
        // Professional border
        playerBase.lineStyle(3, 0x2F4F2F, 0.8);
        playerBase.strokeCircle(0, 0, 18);
        
        // Inner tech ring
        playerBase.lineStyle(2, 0x90EE90, 0.6);
        playerBase.strokeCircle(0, 0, 12);
        
        this.player = playerBase;
        
        // Sophisticated glow effect
        this.playerGlow = this.add.circle(630, 480, 28, 0x32CD32, 0.25);
        this.playerGlow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Professional identification
        this.playerLabel = this.add.text(630, 480, 'M', {
            fontSize: '24px',
            fontFamily: 'Arial Black, sans-serif',
            color: '#FFFFFF',
            fontWeight: '900',
            stroke: '#1A5D1A',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Modern HUD ring around player
        this.playerHUD = this.add.graphics();
        this.playerHUD.x = 630;
        this.playerHUD.y = 480;
        this.playerHUD.lineStyle(2, 0x00CED1, 0.6);
        this.playerHUD.strokeCircle(0, 0, 32);
        this.playerHUD.setVisible(false);
        
        // Enable physics for player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(36, 36);
        
        // Enhanced professional trail system
        this.playerTrail = [];
        for (let i = 0; i < 7; i++) {
            const trailSize = 15 - i * 2;
            const trailAlpha = 0.6 - i * 0.08;
            
            const trailCircle = this.add.graphics();
            trailCircle.fillStyle(0x32CD32, trailAlpha);
            trailCircle.fillCircle(0, 0, trailSize);
            trailCircle.x = 630;
            trailCircle.y = 480;
            trailCircle.visible = false;
            trailCircle.setBlendMode(Phaser.BlendModes.ADD);
            
            this.playerTrail.push(trailCircle);
        }
        
        // Professional pulse animation
        this.tweens.add({
            targets: this.playerGlow,
            scaleX: { from: 1.0, to: 1.15 },
            scaleY: { from: 1.0, to: 1.15 },
            alpha: { from: 0.25, to: 0.4 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
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
        // Enhanced lodge floor with rich textures
        const floorBase = this.add.tileSprite(x, y, w, h, 'lodge_floor');
        floorBase.setTint(room.baseColor);
        floorBase.setAlpha(0.9);
        
        // Add depth with layered shadows
        const floorShadow = this.add.rectangle(x + 3, y + 3, w, h, 0x000000, 0.2);
        floorShadow.setDepth(-1);
        
        // Rich area rug in center for comfort
        if (['Main Hall', 'Lounge', 'Library'].includes(Object.keys(this.rooms).find(key => this.rooms[key].x === x && this.rooms[key].y === y))) {
            const rugSize = Math.min(w, h) * 0.6;
            const rug = this.add.ellipse(x, y, rugSize, rugSize * 0.8, 0x8B0000, 0.3);
            rug.setStroke(0x654321, 3);
            rug.setDepth(-0.5);
            
            // Rug pattern
            const rugPattern = this.add.graphics();
            rugPattern.lineStyle(2, 0x654321, 0.4);
            rugPattern.strokeEllipse(x, y, rugSize * 0.5, rugSize * 0.4);
            rugPattern.strokeEllipse(x, y, rugSize * 0.3, rugSize * 0.24);
            rugPattern.setDepth(-0.4);
            
            this.roomFloors.add(rug);
            this.roomFloors.add(rugPattern);
        }
        
        // Professional lighting for different room types
        let lightingIntensity = 0.1;
        let lightingColor = 0xFFA500;
        
        const roomName = Object.keys(this.rooms).find(key => this.rooms[key].x === x && this.rooms[key].y === y);
        if (roomName === 'Command Center' || roomName === 'War Room') {
            lightingColor = 0x00CED1; // Cooler blue for tech rooms
            lightingIntensity = 0.15;
        } else if (roomName === 'Treasury') {
            lightingColor = 0xFFD700; // Gold for treasury
            lightingIntensity = 0.12;
        }
        
        const roomLight = this.add.circle(x, y - h * 0.15, Math.max(w, h) * 0.7, lightingColor, lightingIntensity);
        roomLight.setBlendMode(Phaser.BlendModes.ADD);
        
        // Add professional corner accents
        const cornerAccents = this.add.graphics();
        cornerAccents.fillStyle(0x8B4513, 0.6);
        
        // Corner trim pieces
        const cornerSize = 12;
        const corners = [
            [x - w/2, y - h/2], [x + w/2, y - h/2], 
            [x - w/2, y + h/2], [x + w/2, y + h/2]
        ];
        
        corners.forEach(([cx, cy]) => {
            cornerAccents.fillRect(cx - cornerSize/2, cy - cornerSize/2, cornerSize, cornerSize);
        });
        
        this.roomFloors.add(floorShadow);
        this.roomFloors.add(floorBase);
        this.roomFloors.add(roomLight);
        this.roomFloors.add(cornerAccents);
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
        
        // Professional workstation base
        const stationBase = this.add.graphics();
        stationBase.fillStyle(0x2F1B14, 0.9);
        stationBase.fillRoundedRect(x - 45, y - 35, 90, 70, 12);
        stationBase.lineStyle(2, 0x8B4513, 0.8);
        stationBase.strokeRoundedRect(x - 45, y - 35, 90, 70, 12);
        
        // Enhanced shadow with depth
        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.3);
        shadow.fillEllipse(x + 3, y + 38, 85, 25);
        shadow.setDepth(-1);
        
        // Modern workstation surface
        const surface = this.add.graphics();
        surface.fillGradientStyle(0x5D4037, 0x5D4037, 0x4E342E, 0x4E342E, 1);
        surface.fillRoundedRect(x - 40, y - 30, 80, 60, 8);
        
        // Professional equipment based on type
        this.createProfessionalEquipment(x, y, type, baseColor);
        
        // Status indicator lights
        const statusLight = this.add.circle(x + 35, y - 25, 4, 0x32CD32, 0.9);
        statusLight.setStroke(0x228B22, 1);
        
        // Modern holographic display effect
        const holoRing = this.add.circle(x, y, 45, 0x00CED1, 0.1);
        holoRing.setStroke(0x00CED1, 2);
        holoRing.setBlendMode(Phaser.BlendModes.ADD);
        
        // Interactive glow
        const interactGlow = this.add.circle(x, y, 50, baseColor, 0.2);
        interactGlow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Professional label
        const stationLabel = this.add.text(x, y + 50, this.getStationName(type), {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#E6D3A3',
            stroke: '#2F1B14',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Modern particle effects
        this.createModernEffects(x, y, type);
        
        // Create the main interactive object
        const obj = this.add.circle(x, y, 35, 0x000000, 0);
        this.physics.add.existing(obj);
        obj.body.setImmovable(true);
        obj.roomName = roomName;
        obj.objectType = type;
        obj.glow = interactGlow;
        obj.holoRing = holoRing;
        obj.statusLight = statusLight;
        
        this.interactiveObjects.add(obj);
        
        // Professional animations
        this.tweens.add({
            targets: holoRing,
            scaleX: { from: 1.0, to: 1.15 },
            scaleY: { from: 1.0, to: 1.15 },
            alpha: { from: 0.3, to: 0.1 },
            duration: 2500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        this.tweens.add({
            targets: interactGlow,
            alpha: { from: 0.2, to: 0.4 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Status light blinking
        this.tweens.add({
            targets: statusLight,
            alpha: { from: 1, to: 0.3 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
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
    
    createProfessionalEquipment(x, y, type, baseColor) {
        const equipment = this.add.graphics();
        
        switch(type) {
            case 'dashboard':
                // Modern dashboard screens
                equipment.fillStyle(0x1A1A1A);
                equipment.fillRoundedRect(x - 25, y - 15, 50, 30, 4);
                equipment.lineStyle(1, 0x00CED1);
                equipment.strokeRoundedRect(x - 25, y - 15, 50, 30, 4);
                
                // Screen glow
                equipment.fillStyle(0x00CED1, 0.3);
                equipment.fillRoundedRect(x - 23, y - 13, 46, 26, 3);
                break;
                
            case 'radio':
                // Communication array
                equipment.fillStyle(0x2F2F2F);
                equipment.fillCircle(x, y, 20);
                equipment.lineStyle(3, 0xFF8C00);
                equipment.strokeCircle(x, y, 18);
                
                // Antenna
                equipment.lineStyle(2, 0xFFFFFF);
                equipment.moveTo(x, y - 20);
                equipment.lineTo(x, y - 35);
                equipment.strokePath();
                break;
                
            case 'safe':
                // Secure vault
                equipment.fillStyle(0x4A4A4A);
                equipment.fillRoundedRect(x - 20, y - 20, 40, 40, 6);
                equipment.lineStyle(2, 0xFFD700);
                equipment.strokeRoundedRect(x - 20, y - 20, 40, 40, 6);
                
                // Lock mechanism
                equipment.fillStyle(0xFFD700);
                equipment.fillCircle(x, y, 8);
                break;
                
            case 'monitors':
                // Surveillance setup
                equipment.fillStyle(0x1A1A1A);
                equipment.fillRoundedRect(x - 22, y - 12, 44, 24, 3);
                equipment.fillRoundedRect(x - 18, y - 8, 36, 16, 2);
                
                equipment.lineStyle(1, 0xFF4444);
                equipment.strokeRoundedRect(x - 22, y - 12, 44, 24, 3);
                break;
                
            case 'training':
                // Fitness equipment
                equipment.fillStyle(0x4A4A4A);
                equipment.fillRect(x - 15, y - 10, 30, 20);
                equipment.lineStyle(2, 0xFF4500);
                equipment.strokeRect(x - 15, y - 10, 30, 20);
                
                // Weight plates
                equipment.fillStyle(0xFF4500);
                equipment.fillCircle(x - 10, y, 6);
                equipment.fillCircle(x + 10, y, 6);
                break;
                
            default:
                // Generic workstation
                equipment.fillStyle(0x3E3E3E);
                equipment.fillRoundedRect(x - 18, y - 12, 36, 24, 4);
                equipment.lineStyle(1, baseColor);
                equipment.strokeRoundedRect(x - 18, y - 12, 36, 24, 4);
        }
    }
    
    getStationName(type) {
        const names = {
            training: 'FITNESS',
            desk: 'STRATEGY',
            bunks: 'REPORTS',
            safe: 'TREASURY',
            dashboard: 'OVERVIEW',
            radio: 'COMMS',
            jukebox: 'AUDIO',
            bookshelf: 'ARCHIVES',
            monitors: 'SECURITY'
        };
        return names[type] || 'STATION';
    }
    
    createModernEffects(x, y, type) {
        // Add subtle ambient particles for tech stations
        if (['dashboard', 'radio', 'monitors'].includes(type)) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const spark = this.add.circle(
                        x + (Math.random() - 0.5) * 40,
                        y + (Math.random() - 0.5) * 30,
                        1,
                        0x00CED1,
                        0.8
                    );
                    
                    spark.setBlendMode(Phaser.BlendModes.ADD);
                    
                    this.tweens.add({
                        targets: spark,
                        y: y - 20 - Math.random() * 15,
                        alpha: 0,
                        duration: 2000 + Math.random() * 1000,
                        ease: 'Quad.easeOut',
                        onComplete: () => spark.destroy()
                    });
                }, Math.random() * 3000);
            }
            
            // Repeat the effect
            setTimeout(() => this.createModernEffects(x, y, type), 4000);
        }
        
        // Energy effects for training station
        if (type === 'training') {
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const energy = this.add.circle(
                        x + (Math.random() - 0.5) * 30,
                        y + 10,
                        1 + Math.random() * 2,
                        0xFF4500,
                        0.7
                    );
                    
                    energy.setBlendMode(Phaser.BlendModes.ADD);
                    
                    this.tweens.add({
                        targets: energy,
                        y: y - 25 - Math.random() * 20,
                        x: x + (Math.random() - 0.5) * 40,
                        alpha: 0,
                        duration: 1800 + Math.random() * 700,
                        ease: 'Quad.easeOut',
                        onComplete: () => energy.destroy()
                    });
                }, Math.random() * 2500);
            }
            
            setTimeout(() => this.createModernEffects(x, y, type), 3500);
        }
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
        
        // Update player HUD position
        this.playerHUD.setPosition(this.player.x, this.player.y);
        
        // Enhanced player trail effect
        const isMoving = velocityX !== 0 || velocityY !== 0;
        if (isMoving) {
            // Show HUD ring when moving
            this.playerHUD.setVisible(true);
            
            // Show and update trail when moving
            this.playerTrail.forEach((trail, index) => {
                trail.visible = true;
                const delay = (index + 1) * 80; // Stagger the trail more smoothly
                this.time.delayedCall(delay, () => {
                    trail.x = this.player.x;
                    trail.y = this.player.y;
                });
            });
            
            // Create professional movement particles
            if (Math.random() < 0.2) {
                const energy = this.add.circle(
                    this.player.x + (Math.random() - 0.5) * 25,
                    this.player.y + 12,
                    1 + Math.random(),
                    0x00CED1,
                    0.7
                );
                
                energy.setBlendMode(Phaser.BlendModes.ADD);
                
                this.tweens.add({
                    targets: energy,
                    alpha: 0,
                    scaleX: 0.1,
                    scaleY: 0.1,
                    y: energy.y - 15,
                    duration: 600,
                    ease: 'Quad.easeOut',
                    onComplete: () => energy.destroy()
                });
            }
        } else {
            // Hide HUD ring when stationary
            this.playerHUD.setVisible(false);
            
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