import{r as x,g as b}from"./phaser-DFK5Ua9d.js";import{n as w}from"./nipplejs-J1xnI5EH.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();var k=x();const l=b(k);class C extends l.Scene{constructor(){super({key:"GameScene"}),this.roomWidth=400,this.roomHeight=300,this.wallThickness=30,this.rooms={"Training Room":{x:230,y:180,object:{x:230,y:180,type:"training"},color:"#5D4037",baseColor:6111287},"War Room":{x:630,y:180,object:{x:630,y:180,type:"desk"},color:"#6D4C41",baseColor:7162945},Barracks:{x:1030,y:180,object:{x:1030,y:180,type:"bunks"},color:"#5D4037",baseColor:6111287},Treasury:{x:230,y:480,object:{x:230,y:480,type:"safe"},color:"#8D6E63",baseColor:9268835},"Main Hall":{x:630,y:480,object:{x:630,y:480,type:"dashboard"},color:"#6D4C41",baseColor:7162945},"Command Center":{x:1030,y:480,object:{x:1030,y:480,type:"radio"},color:"#5D4037",baseColor:6111287},Lounge:{x:230,y:780,object:{x:230,y:780,type:"jukebox"},color:"#8D6E63",baseColor:9268835},Library:{x:630,y:780,object:{x:630,y:780,type:"bookshelf"},color:"#6D4C41",baseColor:7162945},Watchtower:{x:1030,y:780,object:{x:1030,y:780,type:"monitors"},color:"#5D4037",baseColor:6111287}},this.currentRoom="Main Hall",this.nearObject=null,this.particles=[],this.ambientParticles=[],this.lightSources=[],this.shadows=[],this.roomTransitioning=!1}preload(){this.createWoodTexture(),this.createStoneTexture(),this.createMetalTexture(),this.createLeatherTexture(),this.createLodgeTexture()}createWoodTexture(){const t=this.add.graphics(),a=this.textures.createCanvas("wood",256,256),e=a.getSourceImage().getContext("2d"),s=e.createLinearGradient(0,0,0,256);s.addColorStop(0,"#5D3A1A"),s.addColorStop(.3,"#6B4423"),s.addColorStop(.7,"#7A502C"),s.addColorStop(1,"#8B5A2B"),e.fillStyle=s,e.fillRect(0,0,256,256);for(let i=0;i<50;i++){const r=i/50*256,n=Math.sin(r*.02)*10,d=.1+Math.random()*.2;e.strokeStyle=`rgba(45, 30, 15, ${d})`,e.lineWidth=1+Math.random()*2,e.beginPath(),e.moveTo(n,r),e.lineTo(256+n,r),e.stroke()}for(let i=0;i<8;i++){const r=Math.random()*256,n=Math.random()*256,d=10+Math.random()*20;e.fillStyle="rgba(45, 30, 15, 0.3)",e.beginPath(),e.ellipse(r,n,d,d*.6,Math.random()*Math.PI,0,Math.PI*2),e.fill()}a.refresh(),t.destroy()}createStoneTexture(){const t=this.textures.createCanvas("stone",256,256),o=t.getSourceImage().getContext("2d");o.fillStyle="#4A4A4A",o.fillRect(0,0,256,256);for(let e=0;e<256;e+=2)for(let s=0;s<256;s+=2){const i=.3+Math.random()*.4,r=Math.floor(74*i);o.fillStyle=`rgb(${r}, ${r}, ${r})`,o.fillRect(e,s,2,2)}for(let e=0;e<20;e++)o.strokeStyle=`rgba(30, 30, 30, ${.3+Math.random()*.4})`,o.lineWidth=1,o.beginPath(),o.moveTo(Math.random()*256,Math.random()*256),o.lineTo(Math.random()*256,Math.random()*256),o.stroke();t.refresh()}createMetalTexture(){const t=this.textures.createCanvas("metal",256,256),o=t.getSourceImage().getContext("2d"),e=o.createLinearGradient(0,0,256,256);e.addColorStop(0,"#CD7F32"),e.addColorStop(.5,"#B8860B"),e.addColorStop(1,"#DAA520"),o.fillStyle=e,o.fillRect(0,0,256,256);for(let s=0;s<30;s++){const i=Math.random()*256,r=Math.random()*256,n=2+Math.random()*8;o.fillStyle=`rgba(255, 255, 255, ${.1+Math.random()*.3})`,o.beginPath(),o.ellipse(i,r,n,n*.3,Math.random()*Math.PI,0,Math.PI*2),o.fill()}t.refresh()}createLeatherTexture(){const t=this.textures.createCanvas("leather",256,256),o=t.getSourceImage().getContext("2d");o.fillStyle="#8B4513",o.fillRect(0,0,256,256);for(let e=0;e<256;e+=3)for(let s=0;s<256;s+=3){const i=-20+Math.random()*40,r=Math.max(0,Math.min(255,139+i)),n=Math.max(0,Math.min(255,69+i)),d=Math.max(0,Math.min(255,19+i));o.fillStyle=`rgb(${r}, ${n}, ${d})`,o.fillRect(e,s,3,3)}t.refresh()}createLodgeTexture(){const t=this.textures.createCanvas("lodge_floor",512,512),o=t.getSourceImage().getContext("2d"),e=o.createRadialGradient(256,256,50,256,256,350);e.addColorStop(0,"#8B4513"),e.addColorStop(.3,"#A0522D"),e.addColorStop(.6,"#654321"),e.addColorStop(1,"#3E2723"),o.fillStyle=e,o.fillRect(0,0,512,512);for(let i=0;i<512;i+=64){const r=.9+Math.random()*.2;o.fillStyle=`rgba(139, 69, 19, ${r})`,o.fillRect(0,i,512,60),o.strokeStyle="rgba(62, 39, 35, 0.6)",o.lineWidth=2,o.beginPath(),o.moveTo(0,i),o.lineTo(512,i),o.stroke();for(let n=0;n<8;n++){const d=i+Math.random()*60,h=.1+Math.random()*.2;o.strokeStyle=`rgba(62, 39, 35, ${h})`,o.lineWidth=1,o.beginPath(),o.moveTo(0,d),o.lineTo(512,d),o.stroke()}}const s=o.createRadialGradient(256,256,100,256,256,300);s.addColorStop(0,"rgba(255, 165, 0, 0.15)"),s.addColorStop(1,"rgba(255, 140, 0, 0.05)"),o.fillStyle=s,o.globalCompositeOperation="overlay",o.fillRect(0,0,512,512),o.globalCompositeOperation="source-over",t.refresh()}create(){this.createAmbientLighting(),this.createRooms(),this.createPlayer(),this.interactiveObjects=this.physics.add.group(),this.createInteractiveObjects(),this.setupInput(),window.isMobile&&this.setupMobileControls(),this.createWorldBackground(),this.setupCamera(),this.createAtmosphericParticles(),this.createLightingSystem(),this.updateCurrentRoom(),console.log("🎮 Enhanced Lodge scene created successfully!")}createAmbientLighting(){this.ambientLight=this.add.rectangle(650,500,1300,1e3,0,.3),this.ambientLight.setBlendMode(l.BlendModes.MULTIPLY)}createWorldBackground(){const t=this.add.graphics();t.fillGradientStyle(991271,991271,2112067,2904932,.95),t.fillRect(0,0,1300,1e3),t.fillGradientStyle(1717038,1717038,859930,859930,.8),t.fillRect(0,0,1300,200),t.fillGradientStyle(1717038,1717038,859930,859930,.6),t.fillRect(0,800,1300,200);const a=this.add.graphics();a.fillStyle(0,.5),a.fillRoundedRect(20,20,1260,960,15),a.setBlendMode(l.BlendModes.MULTIPLY),t.fillGradientStyle(6111287,5125166,4073251,3022359,.95),t.fillRoundedRect(30,30,1240,940,10),t.lineStyle(3,9268835,.8),t.strokeRoundedRect(30,30,1240,940,10),[{x:150,y:50},{x:650,y:50},{x:1150,y:50},{x:50,y:300},{x:1250,y:300},{x:50,y:700},{x:1250,y:700},{x:150,y:950},{x:650,y:950},{x:1150,y:950}].forEach(e=>{const s=this.add.circle(e.x,e.y,80,16758605,.08);s.setBlendMode(l.BlendModes.ADD);const i=this.add.circle(e.x,e.y,6,16775620,.9);i.setStroke(16758605,2),this.tweens.add({targets:[s,i],alpha:{from:s.alpha,to:s.alpha*1.3},duration:3e3+Math.random()*2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}),this.createProfessionalPathways(t),this.worldBackground=t}createProfessionalPathways(t){t.fillStyle(7162945,.8),t.fillRoundedRect(600,30,100,50,5),t.lineStyle(2,6111287,.4),t.moveTo(30,330),t.lineTo(1270,330),t.moveTo(30,630),t.lineTo(1270,630),t.moveTo(430,30),t.lineTo(430,970),t.moveTo(830,30),t.lineTo(830,970),t.strokePath(),[[30,30],[1270,30],[30,970],[1270,970]].forEach(([o,e])=>{t.fillStyle(9268835,.6),t.fillRoundedRect(o-15,e-15,30,30,8),t.lineStyle(2,16758605,.7),t.strokeRoundedRect(o-15,e-15,30,30,8)})}createPlayer(){const t=this.add.graphics();t.x=630,t.y=480,t.fillGradientStyle(3329330,3329330,2263842,2263842,.9),t.fillCircle(0,0,18),t.lineStyle(3,3100463,.8),t.strokeCircle(0,0,18),t.lineStyle(2,9498256,.6),t.strokeCircle(0,0,12),this.player=t,this.playerGlow=this.add.circle(630,480,28,3329330,.25),this.playerGlow.setBlendMode(l.BlendModes.ADD),this.playerLabel=this.add.text(630,480,"M",{fontSize:"24px",fontFamily:"Arial Black, sans-serif",color:"#FFFFFF",fontWeight:"900",stroke:"#1A5D1A",strokeThickness:3}).setOrigin(.5),this.playerHUD=this.add.graphics(),this.playerHUD.x=630,this.playerHUD.y=480,this.playerHUD.lineStyle(2,52945,.6),this.playerHUD.strokeCircle(0,0,32),this.playerHUD.setVisible(!1),this.physics.add.existing(this.player),this.player.body.setCollideWorldBounds(!0),this.player.body.setSize(36,36),this.playerTrail=[];for(let a=0;a<7;a++){const o=15-a*2,e=.6-a*.08,s=this.add.graphics();s.fillStyle(3329330,e),s.fillCircle(0,0,o),s.x=630,s.y=480,s.visible=!1,s.setBlendMode(l.BlendModes.ADD),this.playerTrail.push(s)}this.tweens.add({targets:this.playerGlow,scaleX:{from:1,to:1.15},scaleY:{from:1,to:1.15},alpha:{from:.25,to:.4},duration:2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}createRooms(){this.roomGraphics=this.add.group(),this.wallsGroup=this.physics.add.staticGroup(),this.roomFloors=this.add.group(),Object.entries(this.rooms).forEach(([t,a])=>{const o=a.x,e=a.y,s=this.roomWidth,i=this.roomHeight;this.createRoomFloor(o,e,s,i,a),this.createRoomAmbience(o,e,s,i,a);const r=this.add.rectangle(o,e-i/2+35,200,30,2955280,.9);r.setStroke(9127187,2);const n=this.add.text(o,e-i/2+35,t,{fontSize:"16px",fontFamily:"Arial Black, sans-serif",color:"#e6d3a3",fontWeight:"bold",stroke:"#2d1810",strokeThickness:2}).setOrigin(.5);this.roomGraphics.add(r),this.roomGraphics.add(n)}),this.createEnhancedWalls(),this.physics.world.setBounds(0,0,1300,1e3)}createRoomFloor(t,a,o,e,s){const i=this.add.tileSprite(t,a,o,e,"lodge_floor");i.setTint(s.baseColor),i.setAlpha(.9);const r=this.add.rectangle(t+3,a+3,o,e,0,.2);if(r.setDepth(-1),["Main Hall","Lounge","Library"].includes(Object.keys(this.rooms).find(g=>this.rooms[g].x===t&&this.rooms[g].y===a))){const g=Math.min(o,e)*.6,y=this.add.ellipse(t,a,g,g*.8,9109504,.3);y.setStroke(6636321,3),y.setDepth(-.5);const f=this.add.graphics();f.lineStyle(2,6636321,.4),f.strokeEllipse(t,a,g*.5,g*.4),f.strokeEllipse(t,a,g*.3,g*.24),f.setDepth(-.4),this.roomFloors.add(y),this.roomFloors.add(f)}let n=.1,d=16753920;const h=Object.keys(this.rooms).find(g=>this.rooms[g].x===t&&this.rooms[g].y===a);h==="Command Center"||h==="War Room"?(d=52945,n=.15):h==="Treasury"&&(d=16766720,n=.12);const p=this.add.circle(t,a-e*.15,Math.max(o,e)*.7,d,n);p.setBlendMode(l.BlendModes.ADD);const u=this.add.graphics();u.fillStyle(9127187,.6);const c=12;[[t-o/2,a-e/2],[t+o/2,a-e/2],[t-o/2,a+e/2],[t+o/2,a+e/2]].forEach(([g,y])=>{u.fillRect(g-c/2,y-c/2,c,c)}),this.roomFloors.add(r),this.roomFloors.add(i),this.roomFloors.add(p),this.roomFloors.add(u)}createRoomAmbience(t,a,o,e,s){const i=this.add.circle(t,a,Math.max(o,e)*.6,16753920,.05);i.setBlendMode(l.BlendModes.ADD);const r=this.add.graphics();r.fillStyle(0,.4);const n=40;r.fillTriangle(t-o/2,a-e/2,t-o/2+n,a-e/2,t-o/2,a-e/2+n),r.fillTriangle(t+o/2,a-e/2,t+o/2-n,a-e/2,t+o/2,a-e/2+n),r.fillTriangle(t-o/2,a+e/2,t-o/2+n,a+e/2,t-o/2,a+e/2-n),r.fillTriangle(t+o/2,a+e/2,t+o/2-n,a+e/2,t+o/2,a+e/2-n),this.roomGraphics.add(i),this.roomGraphics.add(r)}createEnhancedWalls(){const t=this.wallThickness,a=(s,i,r,n)=>{const d=this.add.rectangle(s+2,i+2,r,n,0,.5),h=this.add.tileSprite(s,i,r,n,"stone");h.setTint(3087124);const p=this.add.rectangle(s-1,i-1,r-2,n-2,0,0);return p.setStrokeStyle(1,9127187,.6),this.physics.add.existing(h,!0),this.wallsGroup.add(h),{shadow:d,wall:h,highlight:p}},o=[{x:230,y:180},{x:630,y:180},{x:1030,y:180},{x:230,y:480},{x:630,y:480},{x:1030,y:480},{x:230,y:780},{x:630,y:780},{x:1030,y:780}],e=60;a(630,30,1200,t),a(630,930,1200,t),a(30,480,t,840),a(1230,480,t,840),o.forEach((s,i)=>{if(i<6){const r=s.y+this.roomHeight/2+t/2;a(s.x-this.roomWidth/2+(this.roomWidth-e)/4,r,(this.roomWidth-e)/2,t),a(s.x+this.roomWidth/2-(this.roomWidth-e)/4,r,(this.roomWidth-e)/2,t)}}),o.forEach((s,i)=>{if(i%3!==2){const r=s.x+this.roomWidth/2+t/2;a(r,s.y-this.roomHeight/2+(this.roomHeight-e)/4,t,(this.roomHeight-e)/2),a(r,s.y+this.roomHeight/2-(this.roomHeight-e)/4,t,(this.roomHeight-e)/2)}}),this.physics.add.collider(this.player,this.wallsGroup)}createInteractiveObjects(){Object.entries(this.rooms).forEach(([t,a])=>{a.object.type!=="spawn"&&this.createEnhancedObject(a,t)})}createEnhancedObject(t,a){const o=t.object.x,e=t.object.y,s=t.object.type,i=this.getObjectColor(s),r=this.add.graphics();r.fillStyle(3087124,.9),r.fillRoundedRect(o-45,e-35,90,70,12),r.lineStyle(2,9127187,.8),r.strokeRoundedRect(o-45,e-35,90,70,12);const n=this.add.graphics();n.fillStyle(0,.3),n.fillEllipse(o+3,e+38,85,25),n.setDepth(-1);const d=this.add.graphics();d.fillGradientStyle(6111287,6111287,5125166,5125166,1),d.fillRoundedRect(o-40,e-30,80,60,8),this.createProfessionalEquipment(o,e,s,i);const h=this.add.circle(o+35,e-25,4,3329330,.9);h.setStroke(2263842,1);const p=this.add.circle(o,e,45,52945,.1);p.setStroke(52945,2),p.setBlendMode(l.BlendModes.ADD);const u=this.add.circle(o,e,50,i,.2);u.setBlendMode(l.BlendModes.ADD),this.add.text(o,e+50,this.getStationName(s),{fontSize:"14px",fontFamily:"Arial, sans-serif",fontWeight:"bold",color:"#E6D3A3",stroke:"#2F1B14",strokeThickness:2}).setOrigin(.5),this.createModernEffects(o,e,s);const c=this.add.circle(o,e,35,0,0);this.physics.add.existing(c),c.body.setImmovable(!0),c.roomName=a,c.objectType=s,c.glow=u,c.holoRing=p,c.statusLight=h,this.interactiveObjects.add(c),this.tweens.add({targets:p,scaleX:{from:1,to:1.15},scaleY:{from:1,to:1.15},alpha:{from:.3,to:.1},duration:2500,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:u,alpha:{from:.2,to:.4},duration:2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:h,alpha:{from:1,to:.3},duration:1500,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}createTrainingEffect(t,a){for(let o=0;o<12;o++)setTimeout(()=>{const e=this.add.circle(t+(Math.random()-.5)*25,a+5,1+Math.random()*2,l.Math.RND.pick([16729344,16747520,16766720]),.7);e.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:e,y:a-30-Math.random()*25,x:t+(Math.random()-.5)*35,alpha:0,duration:1500+Math.random()*800,ease:"Quad.easeOut",onComplete:()=>e.destroy()})},Math.random()*2500);setTimeout(()=>this.createTrainingEffect(t,a),3500)}createAlertEffect(t,a){const o=this.add.circle(t,a,8,16729156,.6);o.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:o,scaleX:2,scaleY:2,alpha:0,duration:1e3,ease:"Quad.easeOut",onComplete:()=>{o.destroy(),setTimeout(()=>this.createAlertEffect(t,a),2e3+Math.random()*3e3)}})}createAtmosphericParticles(){for(let t=0;t<80;t++){const a=this.add.circle(l.Math.Between(50,1250),l.Math.Between(50,950),l.Math.Between(1,3),14540253,l.Math.FloatBetween(.1,.3));a.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:a,y:a.y-l.Math.Between(30,100),x:a.x+(Math.random()-.5)*50,alpha:{from:a.alpha,to:.05},duration:l.Math.Between(15e3,25e3),repeat:-1,yoyo:!0,ease:"Sine.easeInOut"}),this.ambientParticles.push(a)}}createLightingSystem(){Object.entries(this.rooms).forEach(([t,a])=>{const o=this.add.circle(a.x,a.y-50,150,16753920,.1);o.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:o,alpha:{from:.08,to:.15},scaleX:{from:.9,to:1.1},scaleY:{from:.9,to:1.1},duration:3e3+Math.random()*2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.lightSources.push(o)})}setupCamera(){this.cameras.main.startFollow(this.player,!0,.08,.08);const t=window.isMobile?1.5:1.2;this.cameras.main.setZoom(t),this.time.addEvent({delay:8e3,callback:()=>{this.cameras.main.shake(50,.002)},loop:!0})}getObjectColor(t){return{training:16729344,desk:16739125,bunks:4620980,safe:16766720,dashboard:3329330,radio:52945,jukebox:16716947,bookshelf:9127187,monitors:16729156}[t]||16747520}getObjectTexture(t){return{training:"metal",desk:"wood",bunks:"leather",safe:"metal",dashboard:"stone",radio:"metal",jukebox:"metal",bookshelf:"wood",monitors:"metal"}[t]||null}getObjectEmoji(t){return{training:"🏋️",desk:"🎯",bunks:"👥",safe:"💰",dashboard:"📊",radio:"📧",jukebox:"🎵",bookshelf:"📚",monitors:"⚠️"}[t]||"❓"}createProfessionalEquipment(t,a,o,e){const s=this.add.graphics();switch(o){case"dashboard":s.fillStyle(1710618),s.fillRoundedRect(t-25,a-15,50,30,4),s.lineStyle(1,52945),s.strokeRoundedRect(t-25,a-15,50,30,4),s.fillStyle(52945,.3),s.fillRoundedRect(t-23,a-13,46,26,3);break;case"radio":s.fillStyle(3092271),s.fillCircle(t,a,20),s.lineStyle(3,16747520),s.strokeCircle(t,a,18),s.lineStyle(2,16777215),s.moveTo(t,a-20),s.lineTo(t,a-35),s.strokePath();break;case"safe":s.fillStyle(4868682),s.fillRoundedRect(t-20,a-20,40,40,6),s.lineStyle(2,16766720),s.strokeRoundedRect(t-20,a-20,40,40,6),s.fillStyle(16766720),s.fillCircle(t,a,8);break;case"monitors":s.fillStyle(1710618),s.fillRoundedRect(t-22,a-12,44,24,3),s.fillRoundedRect(t-18,a-8,36,16,2),s.lineStyle(1,16729156),s.strokeRoundedRect(t-22,a-12,44,24,3);break;case"training":s.fillStyle(4868682),s.fillRect(t-15,a-10,30,20),s.lineStyle(2,16729344),s.strokeRect(t-15,a-10,30,20),s.fillStyle(16729344),s.fillCircle(t-10,a,6),s.fillCircle(t+10,a,6);break;default:s.fillStyle(4079166),s.fillRoundedRect(t-18,a-12,36,24,4),s.lineStyle(1,e),s.strokeRoundedRect(t-18,a-12,36,24,4)}}getStationName(t){return{training:"FITNESS",desk:"STRATEGY",bunks:"REPORTS",safe:"TREASURY",dashboard:"OVERVIEW",radio:"COMMS",jukebox:"AUDIO",bookshelf:"ARCHIVES",monitors:"SECURITY"}[t]||"STATION"}createModernEffects(t,a,o){if(["dashboard","radio","monitors"].includes(o)){for(let e=0;e<3;e++)setTimeout(()=>{const s=this.add.circle(t+(Math.random()-.5)*40,a+(Math.random()-.5)*30,1,52945,.8);s.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:s,y:a-20-Math.random()*15,alpha:0,duration:2e3+Math.random()*1e3,ease:"Quad.easeOut",onComplete:()=>s.destroy()})},Math.random()*3e3);setTimeout(()=>this.createModernEffects(t,a,o),4e3)}if(o==="training"){for(let e=0;e<2;e++)setTimeout(()=>{const s=this.add.circle(t+(Math.random()-.5)*30,a+10,1+Math.random()*2,16729344,.7);s.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:s,y:a-25-Math.random()*20,x:t+(Math.random()-.5)*40,alpha:0,duration:1800+Math.random()*700,ease:"Quad.easeOut",onComplete:()=>s.destroy()})},Math.random()*2500);setTimeout(()=>this.createModernEffects(t,a,o),3500)}}setupInput(){this.cursors=this.input.keyboard.createCursorKeys(),this.wasd=this.input.keyboard.addKeys("W,S,A,D"),this.interact=this.input.keyboard.addKey("E"),this.interact.on("down",()=>{this.handleInteraction()}),this.input.keyboard.addKey("ESC").on("down",()=>{window.lodgeUI.closePanel()})}setupMobileControls(){const t=w.create({zone:document.getElementById("joystick-area"),mode:"static",position:{left:"60px",top:"60px"},color:"orange",size:80});this.joystickData={x:0,y:0},t.on("move",(a,o)=>{const e=Math.min(o.force,1),s=o.angle.radian;this.joystickData.x=Math.cos(s)*e,this.joystickData.y=-Math.sin(s)*e}),t.on("end",()=>{this.joystickData.x=0,this.joystickData.y=0}),document.getElementById("interact-btn").addEventListener("touchstart",a=>{a.preventDefault(),this.handleInteraction()})}update(){let a=0,o=0;if(window.isMobile&&(this.joystickData.x!==0||this.joystickData.y!==0)?(a=this.joystickData.x*160,o=this.joystickData.y*160):(this.cursors.left.isDown||this.wasd.A.isDown?a=-160:(this.cursors.right.isDown||this.wasd.D.isDown)&&(a=160),this.cursors.up.isDown||this.wasd.W.isDown?o=-160:(this.cursors.down.isDown||this.wasd.S.isDown)&&(o=160)),this.player.body.setVelocity(a,o),this.playerGlow.setPosition(this.player.x,this.player.y),this.playerLabel.setPosition(this.player.x,this.player.y),this.playerHUD.setPosition(this.player.x,this.player.y),a!==0||o!==0){if(this.playerHUD.setVisible(!0),this.playerTrail.forEach((s,i)=>{s.visible=!0;const r=(i+1)*80;this.time.delayedCall(r,()=>{s.x=this.player.x,s.y=this.player.y})}),Math.random()<.2){const s=this.add.circle(this.player.x+(Math.random()-.5)*25,this.player.y+12,1+Math.random(),52945,.7);s.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:s,alpha:0,scaleX:.1,scaleY:.1,y:s.y-15,duration:600,ease:"Quad.easeOut",onComplete:()=>s.destroy()})}}else this.playerHUD.setVisible(!1),this.playerTrail.forEach(s=>{s.visible=!1});this.updateCurrentRoom(),this.checkNearbyObjects(),this.updateObjectHoverEffects()}updateObjectHoverEffects(){this.interactiveObjects.children.entries.forEach(t=>{l.Math.Distance.Between(this.player.x,this.player.y,t.x,t.y)<80?(t.glow.setAlpha(.6),t.highlight.setAlpha(1)):(t.glow.setAlpha(.3),t.highlight.setAlpha(.8))})}updateCurrentRoom(){let t=null;const a=this.player.x,o=this.player.y;Object.entries(this.rooms).forEach(([e,s])=>{a>=s.x-this.roomWidth/2&&a<=s.x+this.roomWidth/2&&o>=s.y-this.roomHeight/2&&o<=s.y+this.roomHeight/2&&(t=e)}),t&&t!==this.currentRoom&&this.transitionToRoom(t)}transitionToRoom(t){if(this.roomTransitioning)return;this.roomTransitioning=!0,this.currentRoom=t;const a=this.add.rectangle(650,500,1300,1e3,0,0);this.tweens.add({targets:a,alpha:.3,duration:200,yoyo:!0,onComplete:()=>{a.destroy(),this.roomTransitioning=!1}}),document.getElementById("room-name").textContent=this.currentRoom,window.lodgeUI&&window.lodgeUI.updateMinimap(this.currentRoom,this.player.x,this.player.y),this.adjustRoomLighting(t)}adjustRoomLighting(t){if(!this.rooms[t])return;const o={"Training Room":.2,"Main Hall":.25,"War Room":.35,Watchtower:.4,Treasury:.3,"Command Center":.25,Barracks:.3,Library:.3,Lounge:.2};this.tweens.add({targets:this.ambientLight,alpha:o[t]||.3,duration:1e3,ease:"Sine.easeInOut"})}checkNearbyObjects(){let t=null,a=50;if(this.interactiveObjects.children.entries.forEach(o=>{const e=l.Math.Distance.Between(this.player.x,this.player.y,o.x,o.y);e<a&&(t=o,a=e)}),t!==this.nearObject){this.nearObject=t;const o=document.getElementById("interaction-prompt");this.nearObject?o.style.display="block":o.style.display="none"}}handleInteraction(){if(this.nearObject){const t=this.add.circle(this.nearObject.x,this.nearObject.y,10,16766720,.8);t.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:t,scaleX:3,scaleY:3,alpha:0,duration:300,onComplete:()=>t.destroy()}),window.lodgeUI.openPanel(this.nearObject.roomName,this.nearObject.objectType)}}}class D{constructor(){this.cache=new Map,this.cacheTimeout=300*1e3}async loadData(t){const a=t,o=Date.now();if(this.cache.has(a)){const e=this.cache.get(a);if(o-e.timestamp<this.cacheTimeout)return e.data}try{const e=await fetch(`/data/${t}`);if(!e.ok)throw new Error(`Failed to load ${t}: ${e.statusText}`);const s=await e.json();return this.cache.set(a,{data:s,timestamp:o}),s}catch(e){return console.error(`Error loading ${t}:`,e),this.getFallbackData(t)}}getFallbackData(t){return{"dashboard.json":{weather:{location:"Kaufman, TX",current:{temperature:72,condition:"Partly Cloudy"}},financial_snapshot:{total_liquid:4222.96},quick_stats:{new_leads_today:12,unread_emails:7}},"projects.json":{projects:{land_wholesaling:{leads:{total_in_system:8056,hot_leads:85,in_pipeline:23}}}},"markets.json":{interest_rates:{fed_funds_rate:{current:5.25},mortgage_30yr:{current:6.81}},land_market:{target_counties:{kaufman_tx:{avg_per_acre:8500}}}},"treasury.json":{account_balances:{chase_checking:{balance:2847.23},kalshi_trading:{balance:125.73}}}}[t]||{}}async getDashboardData(){return await this.loadData("dashboard.json")}async getProjectsData(){return await this.loadData("projects.json")}async getMarketsData(){return await this.loadData("markets.json")}async getTreasuryData(){return await this.loadData("treasury.json")}async getAgentsData(){return await this.loadData("agents.json")}async getNewsData(){return await this.loadData("news.json")}async getTrainingData(){return await this.loadData("training.json")}async getEmailsData(){return await this.loadData("emails.json")}async getCalendarData(){return await this.loadData("calendar.json")}async getAlertsData(){return await this.loadData("alerts.json")}clearCache(){this.cache.clear()}getLastUpdated(t){const a=this.cache.get(t);return a&&a.data.last_updated?new Date(a.data.last_updated):null}}class M{constructor(t){this.isMobile=t,this.dataLoader=new D,this.setupEventListeners(),this.startClock(),setTimeout(()=>{this.updateMinimap()},100)}setupEventListeners(){document.getElementById("close-panel").addEventListener("click",()=>{this.closePanel()}),document.getElementById("overlay").addEventListener("click",t=>{t.target.id==="overlay"&&this.closePanel()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.closePanel()})}startClock(){const t=()=>{const o=new Date().toLocaleTimeString("en-US",{hour12:!0,hour:"numeric",minute:"2-digit"}),e=document.getElementById("clock");e&&(e.textContent=o)};t(),setInterval(t,1e3)}updateMinimap(t="Main Hall",a=630,o=480){const e=document.getElementById("minimap");if(!e)return;const s=e.getContext("2d");s.fillStyle="#0a1f0a",s.fillRect(0,0,e.width,e.height),s.fillStyle="#3d2214",s.fillRect(10,5,160,110),s.strokeStyle="#654321",s.lineWidth=2,s.strokeRect(10,5,160,110);const i=50,r=33,n=15,d=10;[{name:"Base Camp",x:n,y:d},{name:"Projects",x:n+i,y:d},{name:"The Team",x:n+i*2,y:d},{name:"Treasury",x:n,y:d+r},{name:"Main Hall",x:n+i,y:d+r},{name:"Command Center",x:n+i*2,y:d+r},{name:"Jukebox",x:n,y:d+r*2},{name:"Field Journal",x:n+i,y:d+r*2},{name:"Trail Cams",x:n+i*2,y:d+r*2}].forEach(c=>{c.name===t&&(s.fillStyle="#ff8c00",s.fillRect(c.x-2,c.y-2,i-6,r-6)),s.strokeStyle="#654321",s.lineWidth=1,s.strokeRect(c.x,c.y,i-10,r-6),s.fillStyle="#e6d3a3",s.font="8px Courier New",s.fillText(c.name.substring(0,4),c.x+2,c.y+12)});const p=(a-30)/1240*160+10,u=(o-30)/940*110+5;s.fillStyle="#32cd32",s.beginPath(),s.arc(p,u,3,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.beginPath(),s.arc(p,u,3,0,Math.PI*2),s.stroke()}async openPanel(t,a){const o=document.getElementById("panel"),e=document.getElementById("overlay"),s=document.getElementById("panel-title"),i=document.getElementById("panel-content");s.textContent=t,i.innerHTML='<div style="text-align: center; padding: 40px; color: var(--lodge-text-secondary);"><div>Loading...</div></div>',e.style.display="block",setTimeout(()=>{o.classList.add("open")},10);try{const r=await this.getPanelContent(t,a);i.innerHTML=r,this.setupPanelInteractions(a)}catch(r){console.error("Error loading panel content:",r),i.innerHTML='<div style="text-align: center; padding: 40px; color: #ff6b35;"><div>Error loading data</div></div>'}}closePanel(){const t=document.getElementById("panel"),a=document.getElementById("overlay");t.classList.remove("open"),setTimeout(()=>{a.style.display="none"},300)}async getPanelContent(t,a){switch(a){case"dashboard":return await this.getMainHallContent();case"radio":return await this.getCommandCenterContent();case"desk":return await this.getWarRoomContent();case"safe":return await this.getTreasuryContent();case"bunks":return await this.getBarracksContent();case"training":return await this.getTrainingRoomContent();case"jukebox":return this.getLoungeContent();case"bookshelf":return this.getLibraryContent();case"monitors":return await this.getWatchtowerContent();default:return"<p>Welcome to The Lodge!</p>"}}async getMainHallContent(){const t=await this.dataLoader.getDashboardData(),a=this.formatLastUpdated(t.last_updated);return`
            <div style="text-align: center; margin-bottom: 24px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📊 Morning Briefing</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">${t.date_info?.current_date||new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${a}</div>
            </div>
            
            <!-- Weather & Location -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="color: var(--lodge-light); margin: 0; font-size: 16px;">📍 ${t.weather?.location||"Kaufman, TX"}</h4>
                        <p style="color: var(--lodge-text-secondary); margin: 4px 0 0 0; font-size: 14px;">${t.weather?.current?.temperature||72}°F • ${t.weather?.current?.condition||"Partly Cloudy"}</p>
                    </div>
                    <div style="font-size: 32px;">🌤️</div>
                </div>
            </div>
            
            <!-- Financial Snapshot -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(t.financial_snapshot?.cash_position?.chase_checking||2847.23)}</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(t.financial_snapshot?.cash_position?.kalshi_balance||125.73)}</span>
                    <div class="stat-label">Kalshi</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$${t.financial_snapshot?.daily_change||45}</span>
                    <div class="stat-label">Yesterday</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${t.financial_snapshot?.monthly_burn||220}</span>
                    <div class="stat-label">Monthly Burn</div>
                </div>
            </div>
            
            <!-- Decision Queue -->
            ${t.decision_queue?this.generateDecisionQueue(t.decision_queue):""}
            
            <!-- Quick Stats -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Quick Stats</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">${t.quick_stats?.new_leads_today||12}</span>
                    <div class="stat-label">New Leads Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.quick_stats?.unread_emails||7}</span>
                    <div class="stat-label">Unread Emails</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.quick_stats?.calendar_items_today||4}</span>
                    <div class="stat-label">Calendar Items</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.quick_stats?.workout_completed?"💪":"⏱️"}</span>
                    <div class="stat-label">Workout ${t.quick_stats?.workout_completed?"Done":"Pending"}</div>
                </div>
            </div>
        `}generateDecisionQueue(t){return!t||!Array.isArray(t)||t.length===0?"":`
            <h4 style="color: #ff4444; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">⚡ Decision Queue</h4>
            <div style="margin-bottom: 20px;">
                ${t.map(a=>`
                    <div style="background: linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1)); border: 1px solid #ff4444; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${a.title}</div>
                            <div style="background: #ff4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">${a.priority}</div>
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-bottom: 4px;">${a.description}</div>
                        ${a.potential_value?`<div style="color: var(--lodge-gold); font-size: 12px; font-weight: 600;">Potential: $${this.formatNumber(a.potential_value)}</div>`:""}
                    </div>
                `).join("")}
            </div>
        `}async getWarRoomContent(){const t=await this.dataLoader.getProjectsData(),a=await this.dataLoader.getMarketsData();await this.dataLoader.getNewsData();const o=this.formatLastUpdated(t.last_updated),e=t.projects?.land_wholesaling;return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎯 War Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Land Wholesaling Operations</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${o}</div>
            </div>
            
            <!-- Market Pulse - NEW Bloomberg-style section -->
            <h4 style="color: #ff8c00; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Market Pulse</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${await this.generateMarketPulse(a)}
            </div>
            
            <!-- Key Metrics -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">${this.formatNumber(e?.leads?.total_in_system||8056)}</span>
                    <div class="stat-label">Total Leads</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">${e?.leads?.new_today||12}</span>
                    <div class="stat-label">New Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">${e?.leads?.in_pipeline||23}</span>
                    <div class="stat-label">In Pipeline</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${this.formatNumber(t.overview?.total_pipeline_value||18e4)}</span>
                    <div class="stat-label">Pipeline Value</div>
                </div>
            </div>
            
            <!-- Campaign Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Campaign Status</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateCampaignStatus(e?.campaigns)}
            </div>
            
            <!-- Deal Pipeline -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏠 Deal Pipeline</h4>
            <div id="deal-pipeline" style="margin-bottom: 20px;">
                ${this.generateDealPipeline(e?.deal_pipeline)}
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📧 Send Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff6b35, #ff4500);">
                    📱 SMS Campaign  
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff8c00, #ff4500);">
                    📊 Full Report  
                </button>
            </div>
        `}async generateMarketPulse(t){const a=t.interest_rates||{},o=t.land_market?.target_counties||{},e=t.construction_costs||{};return`
            <!-- Interest Rate Environment -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${a.fed_funds_rate?.current||5.25}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Fed Funds</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${a.mortgage_30yr?.current||6.81}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">30yr Mortgage</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">$${this.formatNumber(o.kaufman_tx?.avg_per_acre||8500)}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Kaufman/Acre</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: ${this.getTrendColor(e.lumber_index?.trend)}; font-size: 18px; font-weight: 700;">${e.lumber_index?.current||487}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Lumber Index</div>
                </div>
            </div>
            
            <!-- Rate Environment Indicator -->
            <div style="background: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                <span style="color: ${a.mortgage_30yr?.current>7?"#ff6b35":"#ffd700"}; font-weight: 600;">
                    ${this.getRateEnvironmentText(a.mortgage_30yr?.current||6.81)}
                </span>
            </div>
        `}getTrendColor(t){switch(t){case"rising":return"#ff6b35";case"falling":return"#32cd32";case"volatile":return"#ff8c00";default:return"#ffd700"}}getRateEnvironmentText(t){return t>7?"🔴 RESTRICTIVE - Buyer financing challenged":t>6.5?"🟡 MODERATE HEADWIND - Some buyer impact":t>6?"🟢 MANAGEABLE - Normal market conditions":"🟢 FAVORABLE - Strong buyer financing environment"}generateCampaignStatus(t){return t?Object.entries(t).map(([o,e])=>{const s=e.sent>0?(e.responses/e.sent*100).toFixed(2):"0.00",i=e.status==="active"?"#32cd32":"#ffd700";return`
                <div style="padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.name||o.replace(/_/g," ").replace(/\b\w/g,r=>r.toUpperCase())}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-top: 2px;">
                            ${e.sent||0} sent • ${e.responses||0} responses • ${s}% rate
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${i}; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                            ${e.status}
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                            $${(e.cost||0).toFixed(2)}
                        </div>
                    </div>
                </div>
            `}).join(""):'<p style="color: var(--lodge-text-secondary);">No campaigns data available</p>'}generateDealPipeline(t){return t?`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ffd700;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">🔍 Prospecting</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${t.prospecting||0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Active leads</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff8c00;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📞 Contacted</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${t.contacted||0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Follow-ups due</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff6b35;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📋 Negotiating</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${t.negotiating||0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Offers out</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #32cd32;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">✅ Under Contract</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">${t.under_contract||0}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Closing soon</div>
                </div>
            </div>
        `:'<p style="color: var(--lodge-text-secondary);">No pipeline data available</p>'}async getBarracksContent(){const t=await this.dataLoader.getAgentsData();return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">👥 Agent Reports</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Unified Intelligence Feed</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${this.formatLastUpdated(t.last_updated)}</div>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value">${t.summary?.active_agents||4}</span>
                    <div class="stat-label">Active Agents</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.summary?.reports_last_24h||0}</span>
                    <div class="stat-label">Reports 24h</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.total_reports||0}</span>
                    <div class="stat-label">Total Reports</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${t.summary?.system_health==="operational"?"✅":"⚠️"}</span>
                    <div class="stat-label">System Health</div>
                </div>
            </div>
            
            <p style="color: var(--lodge-text-secondary); text-align: center; font-style: italic;">
                Agent reporting system active. ${t.total_reports||0} reports collected.
            </p>
        `}async getTreasuryContent(){const t=await this.dataLoader.getTreasuryData(),a=await this.dataLoader.getMarketsData(),o=this.formatLastUpdated(t.last_updated),e=t.account_balances||{};return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">💰 Treasury</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Financial Command Center</p>
                <div style="color: var(--lodge-text-secondary); font-size: 11px; margin-top: 4px;">Last updated: ${o}</div>
            </div>
            
            <!-- Rate Environment Impact -->
            <h4 style="color: #ff8c00; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Rate Environment Impact</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateRateImpactAnalysis(a,t)}
            </div>
            
            <!-- Account Balances -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏦 Account Balances</h4>
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(e.chase_checking?.balance||2847.23)}</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(e.kalshi_trading?.balance||125.73)}</span>
                    <div class="stat-label">Kalshi Trading</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(e.business_savings?.balance||1250)}</span>
                    <div class="stat-label">Business Savings</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$${this.formatCurrency(this.calculateTotalLiquid(e))}</span>
                    <div class="stat-label">Total Liquid</div>
                </div>
            </div>
            
            <!-- Budget Tracking -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Budget Tracking (February)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateBudgetTracking(t.budget_tracking?.february_2026)}
            </div>
            
            <!-- Cash Flow -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💸 Cash Flow (30 days)</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$${t.cash_flow_30_days?.total_inflow||245}</span>
                    <div class="stat-label">Total Inflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$${Math.abs(t.cash_flow_30_days?.total_outflow||-220)}</span>
                    <div class="stat-label">Total Outflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: ${(t.cash_flow_30_days?.net_flow||25)>0?"#32cd32":"#ff6b35"};">${(t.cash_flow_30_days?.net_flow||25)>0?"+":""}$${t.cash_flow_30_days?.net_flow||25}</span>
                    <div class="stat-label">Net Flow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">$${t.cash_flow_30_days?.projected_monthly_burn||847}</span>
                    <div class="stat-label">Projected Burn</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📊 Full Report
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, var(--lodge-accent), var(--lodge-secondary));">
                    💳 Reconcile
                </button>
            </div>
        `}generateRateImpactAnalysis(t,a){const o=t.interest_rates?.mortgage_30yr?.current||6.81,e=a.deal_financing?.buyer_capacity?.at_current_rates?.median_buyer_max||425e3,s=a.deal_financing?.buyer_capacity?.at_current_rates?.cash_buyer_percentage||.23;return`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div style="text-align: center;">
                    <div style="color: var(--lodge-accent); font-size: 18px; font-weight: 700;">${o}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Current 30yr Rate</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">$${this.formatNumber(e)}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Median Buyer Max</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: var(--lodge-gold); font-size: 18px; font-weight: 700;">${Math.round(s*100)}%</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Cash Buyers</div>
                </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                <span style="color: ${o>7?"#ff6b35":"#32cd32"}; font-weight: 600;">
                    ${this.getCostOfCapitalText(o)}
                </span>
            </div>
        `}getCostOfCapitalText(t){return t>7?"High cost environment - Focus on cash buyers and seller financing":t>6.5?"Moderate cost pressure - Price deals accordingly":"Favorable financing environment - Strong buyer pool available"}generateBudgetTracking(t){return t?Object.entries(t).map(([o,e])=>{const s=e.actual/e.budgeted*100,i=s>100?"#ff6b35":s>80?"#ff8c00":"#32cd32";return`
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${o.replace(/_/g," ").replace(/\b\w/g,r=>r.toUpperCase())}</span>
                        <span style="color: ${i}; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">
                            $${e.actual} / $${e.budgeted}
                        </span>
                    </div>
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 8px; height: 6px;">
                        <div style="width: ${Math.min(s,100)}%; background: ${i}; height: 100%; border-radius: 8px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 2px;">
                        <span style="color: var(--lodge-text-secondary); font-size: 11px;">${s.toFixed(0)}% of budget</span>
                    </div>
                </div>
            `}).join(""):'<p style="color: var(--lodge-text-secondary);">No budget data available</p>'}async getCommandCenterContent(){return'<h3 style="color: var(--lodge-accent);">📧 Command Center</h3><p>Email & Calendar integration coming soon...</p>'}async getTrainingRoomContent(){return'<h3 style="color: var(--lodge-accent);">🏋️ Training Room</h3><p>Ironman training dashboard loading...</p>'}getLoungeContent(){return'<h3 style="color: var(--lodge-accent);">🎵 Lounge</h3><p>Music controls and playlists...</p>'}getLibraryContent(){return'<h3 style="color: var(--lodge-accent);">📚 Library</h3><p>Knowledge base and documents...</p>'}async getWatchtowerContent(){return'<h3 style="color: var(--lodge-accent);">⚠️ Watchtower</h3><p>System alerts and monitoring...</p>'}setupPanelInteractions(t){}formatCurrency(t){return typeof t!="number"?"0.00":t.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}formatNumber(t){return typeof t!="number"?"0":t.toLocaleString("en-US")}formatLastUpdated(t){if(!t)return"Unknown";const a=new Date(t),e=new Date-a,s=Math.floor(e/(1e3*60));if(s<1)return"Just now";if(s<60)return`${s}m ago`;const i=Math.floor(s/60);return i<24?`${i}h ago`:a.toLocaleDateString()}calculateTotalLiquid(t){return(t.chase_checking?.balance||0)+(t.kalshi_trading?.balance||0)+(t.business_savings?.balance||0)}}const v=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||"ontouchstart"in window||navigator.maxTouchPoints>0,S={type:l.AUTO,width:1200,height:800,parent:"game-container",backgroundColor:"#0a1f0a",physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scale:{mode:l.Scale.FIT,autoCenter:l.Scale.CENTER_BOTH,min:{width:800,height:600},max:{width:1600,height:1200}},scene:C},_=new l.Game(S),E=new M(v);window.lodgeGame=_;window.lodgeUI=E;window.isMobile=v;v&&(document.getElementById("mobile-controls").style.display="block");console.log("🏕️ The Lodge initialized successfully!");
