import{r as f,g as b}from"./phaser-DFK5Ua9d.js";import{n as w}from"./nipplejs-J1xnI5EH.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var k=f();const l=b(k);class C extends l.Scene{constructor(){super({key:"GameScene"}),this.roomWidth=400,this.roomHeight=300,this.wallThickness=30,this.rooms={"Training Room":{x:230,y:180,object:{x:230,y:180,type:"training"},color:"#5D4037",baseColor:6111287},"War Room":{x:630,y:180,object:{x:630,y:180,type:"desk"},color:"#6D4C41",baseColor:7162945},Barracks:{x:1030,y:180,object:{x:1030,y:180,type:"bunks"},color:"#5D4037",baseColor:6111287},Treasury:{x:230,y:480,object:{x:230,y:480,type:"safe"},color:"#8D6E63",baseColor:9268835},"Main Hall":{x:630,y:480,object:{x:630,y:480,type:"dashboard"},color:"#6D4C41",baseColor:7162945},"Command Center":{x:1030,y:480,object:{x:1030,y:480,type:"radio"},color:"#5D4037",baseColor:6111287},Lounge:{x:230,y:780,object:{x:230,y:780,type:"jukebox"},color:"#8D6E63",baseColor:9268835},Library:{x:630,y:780,object:{x:630,y:780,type:"bookshelf"},color:"#6D4C41",baseColor:7162945},Watchtower:{x:1030,y:780,object:{x:1030,y:780,type:"monitors"},color:"#5D4037",baseColor:6111287}},this.currentRoom="Main Hall",this.nearObject=null,this.particles=[],this.ambientParticles=[],this.lightSources=[],this.shadows=[],this.roomTransitioning=!1}preload(){this.createWoodTexture(),this.createStoneTexture(),this.createMetalTexture(),this.createLeatherTexture(),this.createLodgeTexture()}createWoodTexture(){const t=this.add.graphics(),e=this.textures.createCanvas("wood",256,256),s=e.getSourceImage().getContext("2d"),o=s.createLinearGradient(0,0,0,256);o.addColorStop(0,"#5D3A1A"),o.addColorStop(.3,"#6B4423"),o.addColorStop(.7,"#7A502C"),o.addColorStop(1,"#8B5A2B"),s.fillStyle=o,s.fillRect(0,0,256,256);for(let i=0;i<50;i++){const r=i/50*256,n=Math.sin(r*.02)*10,d=.1+Math.random()*.2;s.strokeStyle=`rgba(45, 30, 15, ${d})`,s.lineWidth=1+Math.random()*2,s.beginPath(),s.moveTo(n,r),s.lineTo(256+n,r),s.stroke()}for(let i=0;i<8;i++){const r=Math.random()*256,n=Math.random()*256,d=10+Math.random()*20;s.fillStyle="rgba(45, 30, 15, 0.3)",s.beginPath(),s.ellipse(r,n,d,d*.6,Math.random()*Math.PI,0,Math.PI*2),s.fill()}e.refresh(),t.destroy()}createStoneTexture(){const t=this.textures.createCanvas("stone",256,256),a=t.getSourceImage().getContext("2d");a.fillStyle="#4A4A4A",a.fillRect(0,0,256,256);for(let s=0;s<256;s+=2)for(let o=0;o<256;o+=2){const i=.3+Math.random()*.4,r=Math.floor(74*i);a.fillStyle=`rgb(${r}, ${r}, ${r})`,a.fillRect(s,o,2,2)}for(let s=0;s<20;s++)a.strokeStyle=`rgba(30, 30, 30, ${.3+Math.random()*.4})`,a.lineWidth=1,a.beginPath(),a.moveTo(Math.random()*256,Math.random()*256),a.lineTo(Math.random()*256,Math.random()*256),a.stroke();t.refresh()}createMetalTexture(){const t=this.textures.createCanvas("metal",256,256),a=t.getSourceImage().getContext("2d"),s=a.createLinearGradient(0,0,256,256);s.addColorStop(0,"#CD7F32"),s.addColorStop(.5,"#B8860B"),s.addColorStop(1,"#DAA520"),a.fillStyle=s,a.fillRect(0,0,256,256);for(let o=0;o<30;o++){const i=Math.random()*256,r=Math.random()*256,n=2+Math.random()*8;a.fillStyle=`rgba(255, 255, 255, ${.1+Math.random()*.3})`,a.beginPath(),a.ellipse(i,r,n,n*.3,Math.random()*Math.PI,0,Math.PI*2),a.fill()}t.refresh()}createLeatherTexture(){const t=this.textures.createCanvas("leather",256,256),a=t.getSourceImage().getContext("2d");a.fillStyle="#8B4513",a.fillRect(0,0,256,256);for(let s=0;s<256;s+=3)for(let o=0;o<256;o+=3){const i=-20+Math.random()*40,r=Math.max(0,Math.min(255,139+i)),n=Math.max(0,Math.min(255,69+i)),d=Math.max(0,Math.min(255,19+i));a.fillStyle=`rgb(${r}, ${n}, ${d})`,a.fillRect(s,o,3,3)}t.refresh()}createLodgeTexture(){const t=this.textures.createCanvas("lodge_floor",512,512),a=t.getSourceImage().getContext("2d"),s=a.createRadialGradient(256,256,50,256,256,350);s.addColorStop(0,"#8B4513"),s.addColorStop(.3,"#A0522D"),s.addColorStop(.6,"#654321"),s.addColorStop(1,"#3E2723"),a.fillStyle=s,a.fillRect(0,0,512,512);for(let i=0;i<512;i+=64){const r=.9+Math.random()*.2;a.fillStyle=`rgba(139, 69, 19, ${r})`,a.fillRect(0,i,512,60),a.strokeStyle="rgba(62, 39, 35, 0.6)",a.lineWidth=2,a.beginPath(),a.moveTo(0,i),a.lineTo(512,i),a.stroke();for(let n=0;n<8;n++){const d=i+Math.random()*60,p=.1+Math.random()*.2;a.strokeStyle=`rgba(62, 39, 35, ${p})`,a.lineWidth=1,a.beginPath(),a.moveTo(0,d),a.lineTo(512,d),a.stroke()}}const o=a.createRadialGradient(256,256,100,256,256,300);o.addColorStop(0,"rgba(255, 165, 0, 0.15)"),o.addColorStop(1,"rgba(255, 140, 0, 0.05)"),a.fillStyle=o,a.globalCompositeOperation="overlay",a.fillRect(0,0,512,512),a.globalCompositeOperation="source-over",t.refresh()}create(){this.createAmbientLighting(),this.createRooms(),this.createPlayer(),this.interactiveObjects=this.physics.add.group(),this.createInteractiveObjects(),this.setupInput(),window.isMobile&&this.setupMobileControls(),this.createWorldBackground(),this.setupCamera(),this.createAtmosphericParticles(),this.createLightingSystem(),this.updateCurrentRoom(),console.log("🎮 Enhanced Lodge scene created successfully!")}createAmbientLighting(){this.ambientLight=this.add.rectangle(650,500,1300,1e3,0,.3),this.ambientLight.setBlendMode(l.BlendModes.MULTIPLY)}createWorldBackground(){const t=this.add.graphics();t.fillGradientStyle(991271,991271,2112067,2904932,.95),t.fillRect(0,0,1300,1e3),t.fillGradientStyle(1717038,1717038,859930,859930,.8),t.fillRect(0,0,1300,200),t.fillGradientStyle(1717038,1717038,859930,859930,.6),t.fillRect(0,800,1300,200);const e=this.add.graphics();e.fillStyle(0,.5),e.fillRoundedRect(20,20,1260,960,15),e.setBlendMode(l.BlendModes.MULTIPLY),t.fillGradientStyle(6111287,5125166,4073251,3022359,.95),t.fillRoundedRect(30,30,1240,940,10),t.lineStyle(3,9268835,.8),t.strokeRoundedRect(30,30,1240,940,10),[{x:150,y:50},{x:650,y:50},{x:1150,y:50},{x:50,y:300},{x:1250,y:300},{x:50,y:700},{x:1250,y:700},{x:150,y:950},{x:650,y:950},{x:1150,y:950}].forEach(s=>{const o=this.add.circle(s.x,s.y,80,16758605,.08);o.setBlendMode(l.BlendModes.ADD);const i=this.add.circle(s.x,s.y,6,16775620,.9);i.setStroke(16758605,2),this.tweens.add({targets:[o,i],alpha:{from:o.alpha,to:o.alpha*1.3},duration:3e3+Math.random()*2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}),this.createProfessionalPathways(t),this.worldBackground=t}createProfessionalPathways(t){t.fillStyle(7162945,.8),t.fillRoundedRect(600,30,100,50,5),t.lineStyle(2,6111287,.4),t.moveTo(30,330),t.lineTo(1270,330),t.moveTo(30,630),t.lineTo(1270,630),t.moveTo(430,30),t.lineTo(430,970),t.moveTo(830,30),t.lineTo(830,970),t.strokePath(),[[30,30],[1270,30],[30,970],[1270,970]].forEach(([a,s])=>{t.fillStyle(9268835,.6),t.fillRoundedRect(a-15,s-15,30,30,8),t.lineStyle(2,16758605,.7),t.strokeRoundedRect(a-15,s-15,30,30,8)})}createPlayer(){const t=this.add.graphics();t.x=630,t.y=480,t.fillGradientStyle(3329330,3329330,2263842,2263842,.9),t.fillCircle(0,0,18),t.lineStyle(3,3100463,.8),t.strokeCircle(0,0,18),t.lineStyle(2,9498256,.6),t.strokeCircle(0,0,12),this.player=t,this.playerGlow=this.add.circle(630,480,28,3329330,.25),this.playerGlow.setBlendMode(l.BlendModes.ADD),this.playerLabel=this.add.text(630,480,"M",{fontSize:"24px",fontFamily:"Arial Black, sans-serif",color:"#FFFFFF",fontWeight:"900",stroke:"#1A5D1A",strokeThickness:3}).setOrigin(.5),this.playerHUD=this.add.graphics(),this.playerHUD.x=630,this.playerHUD.y=480,this.playerHUD.lineStyle(2,52945,.6),this.playerHUD.strokeCircle(0,0,32),this.playerHUD.setVisible(!1),this.physics.add.existing(this.player),this.player.body.setCollideWorldBounds(!0),this.player.body.setSize(36,36),this.playerTrail=[];for(let e=0;e<7;e++){const a=15-e*2,s=.6-e*.08,o=this.add.graphics();o.fillStyle(3329330,s),o.fillCircle(0,0,a),o.x=630,o.y=480,o.visible=!1,o.setBlendMode(l.BlendModes.ADD),this.playerTrail.push(o)}this.tweens.add({targets:this.playerGlow,scaleX:{from:1,to:1.15},scaleY:{from:1,to:1.15},alpha:{from:.25,to:.4},duration:2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}createRooms(){this.roomGraphics=this.add.group(),this.wallsGroup=this.physics.add.staticGroup(),this.roomFloors=this.add.group(),Object.entries(this.rooms).forEach(([t,e])=>{const a=e.x,s=e.y,o=this.roomWidth,i=this.roomHeight;this.createRoomFloor(a,s,o,i,e),this.createRoomAmbience(a,s,o,i,e);const r=this.add.rectangle(a,s-i/2+35,200,30,2955280,.9);r.setStroke(9127187,2);const n=this.add.text(a,s-i/2+35,t,{fontSize:"16px",fontFamily:"Arial Black, sans-serif",color:"#e6d3a3",fontWeight:"bold",stroke:"#2d1810",strokeThickness:2}).setOrigin(.5);this.roomGraphics.add(r),this.roomGraphics.add(n)}),this.createEnhancedWalls(),this.physics.world.setBounds(0,0,1300,1e3)}createRoomFloor(t,e,a,s,o){const i=this.add.tileSprite(t,e,a,s,"lodge_floor");i.setTint(o.baseColor),i.setAlpha(.9);const r=this.add.rectangle(t+3,e+3,a,s,0,.2);if(r.setDepth(-1),["Main Hall","Lounge","Library"].includes(Object.keys(this.rooms).find(g=>this.rooms[g].x===t&&this.rooms[g].y===e))){const g=Math.min(a,s)*.6,u=this.add.ellipse(t,e,g,g*.8,9109504,.3);u.setStroke(6636321,3),u.setDepth(-.5);const h=this.add.graphics();h.lineStyle(2,6636321,.4),h.strokeEllipse(t,e,g*.5,g*.4),h.strokeEllipse(t,e,g*.3,g*.24),h.setDepth(-.4),this.roomFloors.add(u),this.roomFloors.add(h)}let n=.1,d=16753920;const p=Object.keys(this.rooms).find(g=>this.rooms[g].x===t&&this.rooms[g].y===e);p==="Command Center"||p==="War Room"?(d=52945,n=.15):p==="Treasury"&&(d=16766720,n=.12);const v=this.add.circle(t,e-s*.15,Math.max(a,s)*.7,d,n);v.setBlendMode(l.BlendModes.ADD);const y=this.add.graphics();y.fillStyle(9127187,.6);const c=12;[[t-a/2,e-s/2],[t+a/2,e-s/2],[t-a/2,e+s/2],[t+a/2,e+s/2]].forEach(([g,u])=>{y.fillRect(g-c/2,u-c/2,c,c)}),this.roomFloors.add(r),this.roomFloors.add(i),this.roomFloors.add(v),this.roomFloors.add(y)}createRoomAmbience(t,e,a,s,o){const i=this.add.circle(t,e,Math.max(a,s)*.6,16753920,.05);i.setBlendMode(l.BlendModes.ADD);const r=this.add.graphics();r.fillStyle(0,.4);const n=40;r.fillTriangle(t-a/2,e-s/2,t-a/2+n,e-s/2,t-a/2,e-s/2+n),r.fillTriangle(t+a/2,e-s/2,t+a/2-n,e-s/2,t+a/2,e-s/2+n),r.fillTriangle(t-a/2,e+s/2,t-a/2+n,e+s/2,t-a/2,e+s/2-n),r.fillTriangle(t+a/2,e+s/2,t+a/2-n,e+s/2,t+a/2,e+s/2-n),this.roomGraphics.add(i),this.roomGraphics.add(r)}createEnhancedWalls(){const t=this.wallThickness,e=(o,i,r,n)=>{const d=this.add.rectangle(o+2,i+2,r,n,0,.5),p=this.add.tileSprite(o,i,r,n,"stone");p.setTint(3087124);const v=this.add.rectangle(o-1,i-1,r-2,n-2,0,0);return v.setStrokeStyle(1,9127187,.6),this.physics.add.existing(p,!0),this.wallsGroup.add(p),{shadow:d,wall:p,highlight:v}},a=[{x:230,y:180},{x:630,y:180},{x:1030,y:180},{x:230,y:480},{x:630,y:480},{x:1030,y:480},{x:230,y:780},{x:630,y:780},{x:1030,y:780}],s=60;e(630,30,1200,t),e(630,930,1200,t),e(30,480,t,840),e(1230,480,t,840),a.forEach((o,i)=>{if(i<6){const r=o.y+this.roomHeight/2+t/2;e(o.x-this.roomWidth/2+(this.roomWidth-s)/4,r,(this.roomWidth-s)/2,t),e(o.x+this.roomWidth/2-(this.roomWidth-s)/4,r,(this.roomWidth-s)/2,t)}}),a.forEach((o,i)=>{if(i%3!==2){const r=o.x+this.roomWidth/2+t/2;e(r,o.y-this.roomHeight/2+(this.roomHeight-s)/4,t,(this.roomHeight-s)/2),e(r,o.y+this.roomHeight/2-(this.roomHeight-s)/4,t,(this.roomHeight-s)/2)}}),this.physics.add.collider(this.player,this.wallsGroup)}createInteractiveObjects(){Object.entries(this.rooms).forEach(([t,e])=>{e.object.type!=="spawn"&&this.createEnhancedObject(e,t)})}createEnhancedObject(t,e){const a=t.object.x,s=t.object.y,o=t.object.type,i=this.getObjectColor(o),r=this.add.graphics();r.fillStyle(3087124,.9),r.fillRoundedRect(a-45,s-35,90,70,12),r.lineStyle(2,9127187,.8),r.strokeRoundedRect(a-45,s-35,90,70,12);const n=this.add.graphics();n.fillStyle(0,.3),n.fillEllipse(a+3,s+38,85,25),n.setDepth(-1);const d=this.add.graphics();d.fillGradientStyle(6111287,6111287,5125166,5125166,1),d.fillRoundedRect(a-40,s-30,80,60,8),this.createProfessionalEquipment(a,s,o,i);const p=this.add.circle(a+35,s-25,4,3329330,.9);p.setStroke(2263842,1);const v=this.add.circle(a,s,45,52945,.1);v.setStroke(52945,2),v.setBlendMode(l.BlendModes.ADD);const y=this.add.circle(a,s,50,i,.2);y.setBlendMode(l.BlendModes.ADD),this.add.text(a,s+50,this.getStationName(o),{fontSize:"14px",fontFamily:"Arial, sans-serif",fontWeight:"bold",color:"#E6D3A3",stroke:"#2F1B14",strokeThickness:2}).setOrigin(.5),this.createModernEffects(a,s,o);const c=this.add.circle(a,s,35,0,0);this.physics.add.existing(c),c.body.setImmovable(!0),c.roomName=e,c.objectType=o,c.glow=y,c.holoRing=v,c.statusLight=p,this.interactiveObjects.add(c),this.tweens.add({targets:v,scaleX:{from:1,to:1.15},scaleY:{from:1,to:1.15},alpha:{from:.3,to:.1},duration:2500,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:y,alpha:{from:.2,to:.4},duration:2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:p,alpha:{from:1,to:.3},duration:1500,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})}createTrainingEffect(t,e){for(let a=0;a<12;a++)setTimeout(()=>{const s=this.add.circle(t+(Math.random()-.5)*25,e+5,1+Math.random()*2,l.Math.RND.pick([16729344,16747520,16766720]),.7);s.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:s,y:e-30-Math.random()*25,x:t+(Math.random()-.5)*35,alpha:0,duration:1500+Math.random()*800,ease:"Quad.easeOut",onComplete:()=>s.destroy()})},Math.random()*2500);setTimeout(()=>this.createTrainingEffect(t,e),3500)}createAlertEffect(t,e){const a=this.add.circle(t,e,8,16729156,.6);a.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:a,scaleX:2,scaleY:2,alpha:0,duration:1e3,ease:"Quad.easeOut",onComplete:()=>{a.destroy(),setTimeout(()=>this.createAlertEffect(t,e),2e3+Math.random()*3e3)}})}createAtmosphericParticles(){for(let t=0;t<80;t++){const e=this.add.circle(l.Math.Between(50,1250),l.Math.Between(50,950),l.Math.Between(1,3),14540253,l.Math.FloatBetween(.1,.3));e.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:e,y:e.y-l.Math.Between(30,100),x:e.x+(Math.random()-.5)*50,alpha:{from:e.alpha,to:.05},duration:l.Math.Between(15e3,25e3),repeat:-1,yoyo:!0,ease:"Sine.easeInOut"}),this.ambientParticles.push(e)}}createLightingSystem(){Object.entries(this.rooms).forEach(([t,e])=>{const a=this.add.circle(e.x,e.y-50,150,16753920,.1);a.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:a,alpha:{from:.08,to:.15},scaleX:{from:.9,to:1.1},scaleY:{from:.9,to:1.1},duration:3e3+Math.random()*2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.lightSources.push(a)})}setupCamera(){this.cameras.main.startFollow(this.player,!0,.08,.08);const t=window.isMobile?1.5:1.2;this.cameras.main.setZoom(t),this.time.addEvent({delay:8e3,callback:()=>{this.cameras.main.shake(50,.002)},loop:!0})}getObjectColor(t){return{training:16729344,desk:16739125,bunks:4620980,safe:16766720,dashboard:3329330,radio:52945,jukebox:16716947,bookshelf:9127187,monitors:16729156}[t]||16747520}getObjectTexture(t){return{training:"metal",desk:"wood",bunks:"leather",safe:"metal",dashboard:"stone",radio:"metal",jukebox:"metal",bookshelf:"wood",monitors:"metal"}[t]||null}getObjectEmoji(t){return{training:"🏋️",desk:"🎯",bunks:"👥",safe:"💰",dashboard:"📊",radio:"📧",jukebox:"🎵",bookshelf:"📚",monitors:"⚠️"}[t]||"❓"}createProfessionalEquipment(t,e,a,s){const o=this.add.graphics();switch(a){case"dashboard":o.fillStyle(1710618),o.fillRoundedRect(t-25,e-15,50,30,4),o.lineStyle(1,52945),o.strokeRoundedRect(t-25,e-15,50,30,4),o.fillStyle(52945,.3),o.fillRoundedRect(t-23,e-13,46,26,3);break;case"radio":o.fillStyle(3092271),o.fillCircle(t,e,20),o.lineStyle(3,16747520),o.strokeCircle(t,e,18),o.lineStyle(2,16777215),o.moveTo(t,e-20),o.lineTo(t,e-35),o.strokePath();break;case"safe":o.fillStyle(4868682),o.fillRoundedRect(t-20,e-20,40,40,6),o.lineStyle(2,16766720),o.strokeRoundedRect(t-20,e-20,40,40,6),o.fillStyle(16766720),o.fillCircle(t,e,8);break;case"monitors":o.fillStyle(1710618),o.fillRoundedRect(t-22,e-12,44,24,3),o.fillRoundedRect(t-18,e-8,36,16,2),o.lineStyle(1,16729156),o.strokeRoundedRect(t-22,e-12,44,24,3);break;case"training":o.fillStyle(4868682),o.fillRect(t-15,e-10,30,20),o.lineStyle(2,16729344),o.strokeRect(t-15,e-10,30,20),o.fillStyle(16729344),o.fillCircle(t-10,e,6),o.fillCircle(t+10,e,6);break;default:o.fillStyle(4079166),o.fillRoundedRect(t-18,e-12,36,24,4),o.lineStyle(1,s),o.strokeRoundedRect(t-18,e-12,36,24,4)}}getStationName(t){return{training:"FITNESS",desk:"STRATEGY",bunks:"REPORTS",safe:"TREASURY",dashboard:"OVERVIEW",radio:"COMMS",jukebox:"AUDIO",bookshelf:"ARCHIVES",monitors:"SECURITY"}[t]||"STATION"}createModernEffects(t,e,a){if(["dashboard","radio","monitors"].includes(a)){for(let s=0;s<3;s++)setTimeout(()=>{const o=this.add.circle(t+(Math.random()-.5)*40,e+(Math.random()-.5)*30,1,52945,.8);o.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:o,y:e-20-Math.random()*15,alpha:0,duration:2e3+Math.random()*1e3,ease:"Quad.easeOut",onComplete:()=>o.destroy()})},Math.random()*3e3);setTimeout(()=>this.createModernEffects(t,e,a),4e3)}if(a==="training"){for(let s=0;s<2;s++)setTimeout(()=>{const o=this.add.circle(t+(Math.random()-.5)*30,e+10,1+Math.random()*2,16729344,.7);o.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:o,y:e-25-Math.random()*20,x:t+(Math.random()-.5)*40,alpha:0,duration:1800+Math.random()*700,ease:"Quad.easeOut",onComplete:()=>o.destroy()})},Math.random()*2500);setTimeout(()=>this.createModernEffects(t,e,a),3500)}}setupInput(){this.cursors=this.input.keyboard.createCursorKeys(),this.wasd=this.input.keyboard.addKeys("W,S,A,D"),this.interact=this.input.keyboard.addKey("E"),this.interact.on("down",()=>{this.handleInteraction()}),this.input.keyboard.addKey("ESC").on("down",()=>{window.lodgeUI.closePanel()})}setupMobileControls(){const t=w.create({zone:document.getElementById("joystick-area"),mode:"static",position:{left:"60px",top:"60px"},color:"orange",size:80});this.joystickData={x:0,y:0},t.on("move",(e,a)=>{const s=Math.min(a.force,1),o=a.angle.radian;this.joystickData.x=Math.cos(o)*s,this.joystickData.y=-Math.sin(o)*s}),t.on("end",()=>{this.joystickData.x=0,this.joystickData.y=0}),document.getElementById("interact-btn").addEventListener("touchstart",e=>{e.preventDefault(),this.handleInteraction()})}update(){let e=0,a=0;if(window.isMobile&&(this.joystickData.x!==0||this.joystickData.y!==0)?(e=this.joystickData.x*160,a=this.joystickData.y*160):(this.cursors.left.isDown||this.wasd.A.isDown?e=-160:(this.cursors.right.isDown||this.wasd.D.isDown)&&(e=160),this.cursors.up.isDown||this.wasd.W.isDown?a=-160:(this.cursors.down.isDown||this.wasd.S.isDown)&&(a=160)),this.player.body.setVelocity(e,a),this.playerGlow.setPosition(this.player.x,this.player.y),this.playerLabel.setPosition(this.player.x,this.player.y),this.playerHUD.setPosition(this.player.x,this.player.y),e!==0||a!==0){if(this.playerHUD.setVisible(!0),this.playerTrail.forEach((o,i)=>{o.visible=!0;const r=(i+1)*80;this.time.delayedCall(r,()=>{o.x=this.player.x,o.y=this.player.y})}),Math.random()<.2){const o=this.add.circle(this.player.x+(Math.random()-.5)*25,this.player.y+12,1+Math.random(),52945,.7);o.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:o,alpha:0,scaleX:.1,scaleY:.1,y:o.y-15,duration:600,ease:"Quad.easeOut",onComplete:()=>o.destroy()})}}else this.playerHUD.setVisible(!1),this.playerTrail.forEach(o=>{o.visible=!1});this.updateCurrentRoom(),this.checkNearbyObjects(),this.updateObjectHoverEffects()}updateObjectHoverEffects(){this.interactiveObjects.children.entries.forEach(t=>{l.Math.Distance.Between(this.player.x,this.player.y,t.x,t.y)<80?(t.glow.setAlpha(.6),t.highlight.setAlpha(1)):(t.glow.setAlpha(.3),t.highlight.setAlpha(.8))})}updateCurrentRoom(){let t=null;const e=this.player.x,a=this.player.y;Object.entries(this.rooms).forEach(([s,o])=>{e>=o.x-this.roomWidth/2&&e<=o.x+this.roomWidth/2&&a>=o.y-this.roomHeight/2&&a<=o.y+this.roomHeight/2&&(t=s)}),t&&t!==this.currentRoom&&this.transitionToRoom(t)}transitionToRoom(t){if(this.roomTransitioning)return;this.roomTransitioning=!0,this.currentRoom=t;const e=this.add.rectangle(650,500,1300,1e3,0,0);this.tweens.add({targets:e,alpha:.3,duration:200,yoyo:!0,onComplete:()=>{e.destroy(),this.roomTransitioning=!1}}),document.getElementById("room-name").textContent=this.currentRoom,window.lodgeUI&&window.lodgeUI.updateMinimap(this.currentRoom,this.player.x,this.player.y),this.adjustRoomLighting(t)}adjustRoomLighting(t){if(!this.rooms[t])return;const a={"Training Room":.2,"Main Hall":.25,"War Room":.35,Watchtower:.4,Treasury:.3,"Command Center":.25,Barracks:.3,Library:.3,Lounge:.2};this.tweens.add({targets:this.ambientLight,alpha:a[t]||.3,duration:1e3,ease:"Sine.easeInOut"})}checkNearbyObjects(){let t=null,e=50;if(this.interactiveObjects.children.entries.forEach(a=>{const s=l.Math.Distance.Between(this.player.x,this.player.y,a.x,a.y);s<e&&(t=a,e=s)}),t!==this.nearObject){this.nearObject=t;const a=document.getElementById("interaction-prompt");this.nearObject?a.style.display="block":a.style.display="none"}}handleInteraction(){if(this.nearObject){const t=this.add.circle(this.nearObject.x,this.nearObject.y,10,16766720,.8);t.setBlendMode(l.BlendModes.ADD),this.tweens.add({targets:t,scaleX:3,scaleY:3,alpha:0,duration:300,onComplete:()=>t.destroy()}),window.lodgeUI.openPanel(this.nearObject.roomName,this.nearObject.objectType)}}}class S{constructor(t){this.isMobile=t,this.setupEventListeners(),this.startClock(),setTimeout(()=>{this.updateMinimap()},100)}setupEventListeners(){document.getElementById("close-panel").addEventListener("click",()=>{this.closePanel()}),document.getElementById("overlay").addEventListener("click",t=>{t.target.id==="overlay"&&this.closePanel()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.closePanel()})}startClock(){const t=()=>{const a=new Date().toLocaleTimeString("en-US",{hour12:!0,hour:"numeric",minute:"2-digit"}),s=document.getElementById("clock");s&&(s.textContent=a)};t(),setInterval(t,1e3)}updateMinimap(t="Main Hall",e=630,a=480){const s=document.getElementById("minimap");if(!s)return;const o=s.getContext("2d");o.fillStyle="#0a1f0a",o.fillRect(0,0,s.width,s.height),o.fillStyle="#3d2214",o.fillRect(10,5,160,110),o.strokeStyle="#654321",o.lineWidth=2,o.strokeRect(10,5,160,110);const i=50,r=33,n=15,d=10;[{name:"Base Camp",x:n,y:d},{name:"Projects",x:n+i,y:d},{name:"The Team",x:n+i*2,y:d},{name:"Treasury",x:n,y:d+r},{name:"Main Hall",x:n+i,y:d+r},{name:"Command Center",x:n+i*2,y:d+r},{name:"Jukebox",x:n,y:d+r*2},{name:"Field Journal",x:n+i,y:d+r*2},{name:"Trail Cams",x:n+i*2,y:d+r*2}].forEach(c=>{c.name===t&&(o.fillStyle="#ff8c00",o.fillRect(c.x-2,c.y-2,i-6,r-6)),o.strokeStyle="#654321",o.lineWidth=1,o.strokeRect(c.x,c.y,i-10,r-6),o.fillStyle="#e6d3a3",o.font="8px Courier New",o.fillText(c.name.substring(0,4),c.x+2,c.y+12)});const v=(e-30)/1240*160+10,y=(a-30)/940*110+5;o.fillStyle="#32cd32",o.beginPath(),o.arc(v,y,3,0,Math.PI*2),o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.beginPath(),o.arc(v,y,3,0,Math.PI*2),o.stroke()}openPanel(t,e){const a=document.getElementById("panel"),s=document.getElementById("overlay"),o=document.getElementById("panel-title"),i=document.getElementById("panel-content");o.textContent=t,i.innerHTML=this.getPanelContent(t,e),s.style.display="block",setTimeout(()=>{a.classList.add("open")},10),this.setupPanelInteractions(e)}closePanel(){const t=document.getElementById("panel"),e=document.getElementById("overlay");t.classList.remove("open"),setTimeout(()=>{e.style.display="none"},300)}getPanelContent(t,e){switch(e){case"dashboard":return this.getMainHallContent();case"radio":return this.getCommandCenterContent();case"desk":return this.getWarRoomContent();case"safe":return this.getTreasuryContent();case"bunks":return this.getBarracksContent();case"training":return this.getTrainingRoomContent();case"jukebox":return this.getLoungeContent();case"bookshelf":return this.getLibraryContent();case"monitors":return this.getWatchtowerContent();default:return"<p>Welcome to The Lodge!</p>"}}getMainHallContent(){return`
            <div style="text-align: center; margin-bottom: 24px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📊 Morning Briefing</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
            
            <!-- Weather & Location -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="color: var(--lodge-light); margin: 0; font-size: 16px;">📍 Kaufman, TX</h4>
                        <p style="color: var(--lodge-text-secondary); margin: 4px 0 0 0; font-size: 14px;">72°F • Partly Cloudy</p>
                    </div>
                    <div style="font-size: 32px;">🌤️</div>
                </div>
            </div>
            
            <!-- Financial Snapshot -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$2,847</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$125.73</span>
                    <div class="stat-label">Kalshi</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$45</span>
                    <div class="stat-label">Yesterday</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$220</span>
                    <div class="stat-label">Monthly Burn</div>
                </div>
            </div>
            
            <!-- Recent Transactions -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💳 Recent Transactions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                ${this.generateTransactionList()}
            </div>
            
            <!-- Subscriptions Due -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Upcoming Charges</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 140, 0, 0.3); border-radius: 12px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: var(--lodge-light); font-size: 14px;">OpenAI API</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 20 • ~$85</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: var(--lodge-light); font-size: 14px;">Anthropic Claude</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 23 • ~$65</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--lodge-light); font-size: 14px;">Digital Ocean</span>
                    <span style="color: var(--lodge-accent); font-size: 14px; font-weight: 600;">Feb 28 • $20</span>
                </div>
            </div>
            
            <!-- Quick Stats -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Quick Stats</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">47</span>
                    <div class="stat-label">New Leads Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">12</span>
                    <div class="stat-label">Unread Emails</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">2</span>
                    <div class="stat-label">Calendar Items</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">💪</span>
                    <div class="stat-label">Workout Done</div>
                </div>
            </div>
        `}getWarRoomContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎯 War Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Land Wholesaling Operations</p>
            </div>
            
            <!-- Key Metrics -->
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">16,663</span>
                    <div class="stat-label">Total Leads</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">47</span>
                    <div class="stat-label">New Today</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">23</span>
                    <div class="stat-label">In Pipeline</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">$180K</span>
                    <div class="stat-label">Potential This Week</div>
                </div>
            </div>
            
            <!-- Campaign Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Campaign Status</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateCampaignStatus()}
            </div>
            
            <!-- Deal Pipeline -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏠 Deal Pipeline</h4>
            <div id="deal-pipeline" style="margin-bottom: 20px;">
                ${this.generateDealPipeline()}
            </div>
            
            <!-- Agent Activity -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🎯 Agent Activity (24h)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #32cd32; font-weight: 600;">Scout</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Lead Generation</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">47 leads found</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Ellis & Dallas Counties</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-accent); font-weight: 600;">Tim</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Sales Manager</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">8 calls made</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">3 appointments booked</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #9370db; font-weight: 600;">Tracker</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Market Analysis</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-weight: 600;">Market scan complete</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Inventory down 15%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📧 Send Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff6b35, #ff4500);">
                    📱 SMS Campaign  
                </button>
            </div>
        `}getBarracksContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">👥 Agent Reports</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Unified Intelligence Feed</p>
            </div>
            
            <!-- Filter Tabs -->
            <div class="report-tabs" style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto;">
                <button class="tab-btn active" onclick="window.lodgeUI.switchReportTab('today')">Today</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('week')">This Week</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('highlights')">Highlights</button>
                <button class="tab-btn" onclick="window.lodgeUI.switchReportTab('all')">All</button>
            </div>
            
            <!-- Agent Filter -->
            <div style="display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto;">
                <span style="color: var(--lodge-text-secondary); font-size: 12px; align-self: center; margin-right: 8px; white-space: nowrap;">FILTER:</span>
                <button class="filter-btn active" data-agent="all">ALL</button>
                <button class="filter-btn" data-agent="scout">Scout</button>
                <button class="filter-btn" data-agent="builder">Builder</button>
                <button class="filter-btn" data-agent="tim">Tim</button>
                <button class="filter-btn" data-agent="tracker">Tracker</button>
            </div>
            
            <!-- Reports Feed -->
            <div id="reports-feed" style="max-height: 500px; overflow-y: auto;">
                ${this.generateReportsFeed()}
            </div>
            
            <!-- Load More -->
            <div style="text-align: center; margin-top: 16px;">
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 16px;" onclick="window.lodgeUI.loadMoreReports()">
                    Load More Reports
                </button>
            </div>
            
            <!-- Summary Stats -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-top: 20px;">
                <h4 style="color: var(--lodge-accent); margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">📊 Report Summary (24h)</h4>
                <div class="stats-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">23</span>
                        <div class="stat-label" style="font-size: 11px;">Total Reports</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">7</span>
                        <div class="stat-label" style="font-size: 11px;">Unread</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">4</span>
                        <div class="stat-label" style="font-size: 11px;">Active Agents</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 18px;">3</span>
                        <div class="stat-label" style="font-size: 11px;">Platforms</div>
                    </div>
                </div>
            </div>
        `}getTreasuryContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">💰 Treasury</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Financial Command Center</p>
            </div>
            
            <!-- Account Balances -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🏦 Account Balances</h4>
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$2,847</span>
                    <div class="stat-label">Chase Checking</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$125.73</span>
                    <div class="stat-label">Kalshi Trading</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$1,250</span>
                    <div class="stat-label">Business Savings</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">$4,222.73</span>
                    <div class="stat-label">Total Liquid</div>
                </div>
            </div>
            
            <!-- Budget vs Actual -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📊 Budget Tracking (February)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateBudgetTracking()}
            </div>
            
            <!-- Investment Positions -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Investment Positions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600;">Kalshi Prediction Market</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Active positions: 3</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-gold); font-weight: 600; font-family: 'JetBrains Mono', monospace;">$125.73</div>
                            <div style="color: #32cd32; font-size: 12px; font-weight: 600;">+12.4%</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600;">Real Estate Holdings</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Properties under contract: 3</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-gold); font-weight: 600; font-family: 'JetBrains Mono', monospace;">$180K</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Potential profit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Cash Flow Analysis -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">💸 Cash Flow (30 days)</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">+$245</span>
                    <div class="stat-label">Total Inflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">-$220</span>
                    <div class="stat-label">Total Outflow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">+$25</span>
                    <div class="stat-label">Net Flow</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">$847</span>
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
        `}getCommandCenterContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📧 Command Center</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Email & Calendar Operations</p>
            </div>
            
            <!-- Email Priority Inbox -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📬 Priority Inbox (12 unread)</h4>
            <div style="max-height: 300px; overflow-y: auto; background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; margin-bottom: 20px;">
                ${this.generateEmailList()}
            </div>
            
            <!-- Today's Calendar -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Today's Schedule</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                ${this.generateTodaysCalendar()}
            </div>
            
            <!-- This Week Preview -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📆 This Week</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateWeekPreview()}
            </div>
            
            <!-- Quick Actions -->
            <div class="button-group" style="margin-bottom: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #ff4500, #ff6347);">
                    🚀 Email Blast
                </button>
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📅 Quick Event
                </button>
            </div>
            
            <!-- Notifications -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🔔 Notifications</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">3</span>
                    <div class="stat-label">Meeting Reminders</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">7</span>
                    <div class="stat-label">Email Replies</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">2</span>
                    <div class="stat-label">Task Due</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #9370db;">1</span>
                    <div class="stat-label">Calendar Conflicts</div>
                </div>
            </div>
        `}getJukeboxContent(){return`
            <h3 style="color: #ff8c00; margin-bottom: 20px;">🎵 Jukebox</h3>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 64px; margin-bottom: 15px;">🎵</div>
                <p style="color: #c4a374;">Set the mood for your hunt</p>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h4 style="color: #32cd32; margin: 0 0 15px 0;">🎧 Now Playing</h4>
                <p style="font-size: 16px; margin: 0 0 5px 0;">"Eye of the Tiger"</p>
                <p style="color: #c4a374; margin: 0;">Survivor • Greatest Hits</p>
                
                <div style="margin: 15px 0;">
                    <div style="width: 100%; background: rgba(139, 69, 19, 0.5); border-radius: 10px; height: 6px;">
                        <div style="width: 45%; background: #32cd32; height: 100%; border-radius: 10px;"></div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 20px; cursor: pointer;">⏮️</button>
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 24px; cursor: pointer;">⏸️</button>
                    <button style="background: none; border: none; color: #e6d3a3; font-size: 20px; cursor: pointer;">⏭️</button>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">🎶 Playlists</h4>
            
            <div class="button-group" style="flex-direction: column;">
                <button class="lodge-btn">🏹 Hunt Mode (Focus Music)</button>
                <button class="lodge-btn">🔥 Pump Up (Motivational)</button>
                <button class="lodge-btn">🌲 Lodge Vibes (Chill)</button>
                <button class="lodge-btn">💼 Business (Professional)</button>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.2); padding: 15px; border-radius: 6px; margin-top: 20px; text-align: center;">
                <p style="color: #c4a374; font-style: italic; margin: 0;">
                    🎯 "The right soundtrack makes every deal feel like a victory"
                </p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(50, 205, 50, 0.2); border-radius: 6px; border: 1px solid #32cd32;">
                <p style="color: #32cd32; margin: 0; font-size: 14px;">
                    💡 <strong>Pro Tip:</strong> Studies show that upbeat music increases productivity by 23%
                </p>
            </div>
        `}getFieldJournalContent(){return`
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📚 Field Journal</h3>
            
            <div style="margin-bottom: 20px;">
                <input type="text" placeholder="🔍 Search leads..." style="width: 100%; padding: 12px; background: rgba(139, 69, 19, 0.3); border: 1px solid #654321; border-radius: 6px; color: #e6d3a3; font-size: 14px;">
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">All Counties</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Dallas</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Ellis</button>
                <button class="lodge-btn" style="font-size: 12px; padding: 8px 12px;">Kaufman</button>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">🏠 Recent Leads (${this.formatNumber(16663)} total)</h4>
            
            <div style="background: rgba(139, 69, 19, 0.2); border-radius: 6px; overflow: hidden;">
                ${this.generateLeadsTable()}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="lodge-btn" style="background: linear-gradient(135deg, #32cd32, #228b22);">
                    📊 Generate Report
                </button>
            </div>
            
            <div class="stats-grid" style="margin-top: 25px;">
                <div class="stat-card">
                    <span class="stat-value">47</span>
                    <div class="stat-label">Today's Finds</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">12</span>
                    <div class="stat-label">High Priority</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">85%</span>
                    <div class="stat-label">Quality Score</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">$92K</span>
                    <div class="stat-label">Avg Value</div>
                </div>
            </div>
        `}getTrailCamsContent(){return`
            <h3 style="color: #ff8c00; margin-bottom: 20px;">📹 Trail Cams</h3>
            
            <div style="margin-bottom: 20px;">
                <div class="button-group">
                    <button class="lodge-btn active">All</button>
                    <button class="lodge-btn">🔥 Hot Leads</button>
                    <button class="lodge-btn">💬 Responses</button>
                    <button class="lodge-btn">⚙️ System</button>
                    <button class="lodge-btn">🏠 Deals</button>
                </div>
            </div>
            
            <h4 style="color: #ff8c00; margin: 20px 0 15px 0;">📊 Live Feed</h4>
            
            <div style="max-height: 400px; overflow-y: auto;">
                ${this.generateNotificationFeed()}
            </div>
            
            <div class="stats-grid" style="margin-top: 25px;">
                <div class="stat-card">
                    <span class="stat-value">23</span>
                    <div class="stat-label">Active Alerts</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">156</span>
                    <div class="stat-label">Today's Events</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">7</span>
                    <div class="stat-label">Critical</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value">98%</span>
                    <div class="stat-label">Uptime</div>
                </div>
            </div>
            
            <div style="background: rgba(139, 69, 19, 0.3); padding: 15px; border-radius: 6px; margin-top: 20px; text-align: center;">
                <p style="color: #e6d3a3; margin: 0; font-size: 14px;">
                    📡 <strong>Trail Cams Status:</strong> <span style="color: #32cd32;">MONITORING</span>
                </p>
                <p style="color: #c4a374; margin: 5px 0 0 0; font-size: 12px;">
                    All systems operational • Last scan: 2 minutes ago
                </p>
            </div>
        `}generateLeadsTable(){return[{address:"123 Oak Street",county:"Dallas",value:"$95,000",priority:"🔥",status:"New"},{address:"456 Pine Avenue",county:"Ellis",value:"$87,500",priority:"⭐",status:"Contacted"},{address:"789 Maple Drive",county:"Kaufman",value:"$102,000",priority:"🔥",status:"New"},{address:"321 Cedar Lane",county:"Dallas",value:"$78,000",priority:"💎",status:"Qualified"},{address:"654 Birch Way",county:"Ellis",value:"$91,200",priority:"⭐",status:"New"},{address:"987 Elm Court",county:"Kaufman",value:"$83,800",priority:"🔥",status:"Follow-up"},{address:"147 Ash Street",county:"Dallas",value:"$96,500",priority:"💎",status:"New"},{address:"258 Willow Ave",county:"Ellis",value:"$89,300",priority:"⭐",status:"Contacted"},{address:"369 Poplar Dr",county:"Kaufman",value:"$94,700",priority:"🔥",status:"New"},{address:"741 Spruce Ln",county:"Dallas",value:"$88,900",priority:"💎",status:"Qualified"}].map((e,a)=>`
            <div style="padding: 12px; border-bottom: 1px solid #654321; display: flex; justify-content: space-between; align-items: center; ${a%2===0?"background: rgba(139, 69, 19, 0.1);":""}">
                <div style="flex: 1;">
                    <div style="font-weight: bold; margin-bottom: 4px;">${e.priority} ${e.address}</div>
                    <div style="font-size: 12px; color: #c4a374;">${e.county} County • ${e.value}</div>
                </div>
                <div style="text-align: right; font-size: 12px;">
                    <div style="padding: 4px 8px; background: rgba(255, 140, 0, 0.3); border-radius: 12px; color: #ff8c00; font-weight: bold;">
                        ${e.status}
                    </div>
                </div>
            </div>
        `).join("")}generateReportsFeed(){return[{id:1,agent:"Scout",timestamp:"2026-02-16T17:45:00Z",source:"Discord #leads",type:"lead-report",priority:"high",content:"Found 12 new high-value properties in Ellis County. Average equity: $67K. 3 properties marked as urgent - owners responding to calls.",data:{leads:12,avgEquity:67e3,urgent:3}},{id:2,agent:"Builder",timestamp:"2026-02-16T17:30:00Z",source:"Terminal",type:"deployment",priority:"medium",content:"Lodge visual upgrade deployed successfully. Enhanced lighting, textures, and unified report system now live. Performance improved 23%.",data:{deploymentId:"lodge-v2.1",performance:"+23%"}},{id:3,agent:"Tim",timestamp:"2026-02-16T16:15:00Z",source:"Telegram DM",type:"pipeline-update",priority:"high",content:"Called 8 leads today. 3 verbal agreements for site visits. 2 properties ready for contract. Deal pipeline strong - $180K potential this week.",data:{callsMade:8,siteVisits:3,contracts:2,potentialValue:18e4}},{id:4,agent:"Tracker",timestamp:"2026-02-16T15:45:00Z",source:"Cron Job",type:"market-analysis",priority:"medium",content:"Market scan complete. Dallas County inventory down 15% this week. Prices trending up. Recommend increasing acquisition pace.",data:{inventoryChange:"-15%",priceDirection:"up",recommendation:"increase_pace"}},{id:5,agent:"Scout",timestamp:"2026-02-16T14:30:00Z",source:"Discord #alerts",type:"alert",priority:"urgent",content:"URGENT: 456 Oak Street owner just listed with realtor at $95K. Our analysis shows $45K equity. Move fast!",data:{property:"456 Oak Street",listPrice:95e3,equity:45e3,urgency:"high"}},{id:6,agent:"Builder",timestamp:"2026-02-16T13:20:00Z",source:"Discord #dev",type:"system-health",priority:"low",content:"All systems operational. Lead processing: 99.2% uptime. Email campaigns: 89% delivery rate. Database optimized.",data:{uptime:"99.2%",deliveryRate:"89%",dbStatus:"optimized"}},{id:7,agent:"Tim",timestamp:"2026-02-16T12:00:00Z",source:"Telegram Group",type:"daily-standup",priority:"medium",content:"Morning update: 5 appointments scheduled this week. 2 contracts in review. Need Builder to update CRM integration by Wed.",data:{appointments:5,contractsInReview:2,taskAssigned:"crm-integration"}}].map(e=>this.renderReport(e)).join("")}renderReport(t){const e=this.getTimeAgo(t.timestamp),a={urgent:"#ff4444",high:"#ff8c00",medium:"#ffd700",low:"#32cd32"}[t.priority]||"#888",s={"Discord #leads":"💬","Discord #alerts":"🚨","Discord #dev":"⚙️","Telegram DM":"📱","Telegram Group":"👥",Terminal:"💻","Cron Job":"🤖"}[t.source]||"📝",o={Scout:"#32cd32",Builder:"#00ced1",Tim:"#ff8c00",Tracker:"#9370db"}[t.agent]||"#888";return`
            <div class="report-item" style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 12px; border-left: 4px solid ${a};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${o}; font-weight: 600; font-size: 14px;">${t.agent}</span>
                        <span style="font-size: 12px;">${s}</span>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${t.source}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${e}</div>
                        <div style="background: ${a}; color: white; font-size: 9px; padding: 2px 6px; border-radius: 8px; font-weight: 600; margin-top: 2px; text-transform: uppercase;">${t.priority}</div>
                    </div>
                </div>
                
                <div style="color: var(--lodge-light); font-size: 14px; line-height: 1.5; margin-bottom: 8px;">
                    ${t.content}
                </div>
                
                ${t.data?this.renderReportData(t):""}
            </div>
        `}renderReportData(t){return t.data?`<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">${Object.entries(t.data).map(([a,s])=>{let o=s;return typeof s=="number"&&s>1e3&&(o=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(s)),`<span style="background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 6px; font-size: 11px; color: var(--lodge-text-secondary); font-family: 'JetBrains Mono', monospace;">${a}: ${o}</span>`}).join("")}</div>`:""}getTimeAgo(t){const e=new Date,a=new Date(t),s=e-a,o=Math.floor(s/(1e3*60)),i=Math.floor(s/(1e3*60*60)),r=Math.floor(s/(1e3*60*60*24));return o<1?"Just now":o<60?`${o}m ago`:i<24?`${i}h ago`:`${r}d ago`}generateNotificationFeed(){return[{time:"2 min ago",type:"🔥",message:"High-value property detected: 123 Oak St, Dallas County",category:"hot"},{time:"5 min ago",type:"📧",message:"Email response received from motivated seller",category:"response"},{time:"8 min ago",type:"⚙️",message:"Lead processing completed: 47 new prospects",category:"system"},{time:"12 min ago",type:"💰",message:"Deal potential flagged: $45K profit margin detected",category:"deal"},{time:"15 min ago",type:"🔍",message:"Scout identified 12 new properties in Ellis County",category:"hot"},{time:"18 min ago",type:"📱",message:"SMS campaign delivered: 89% open rate",category:"system"},{time:"22 min ago",type:"🏠",message:"Property analysis complete: 456 Pine Ave",category:"hot"},{time:"28 min ago",type:"💬",message:"Lead responded to follow-up call",category:"response"},{time:"32 min ago",type:"⚡",message:"System performance optimized: 23% faster processing",category:"system"},{time:"35 min ago",type:"🎯",message:"Marketing campaign ROI: 340% return detected",category:"deal"}].map((e,a)=>`
            <div style="padding: 12px; border-bottom: 1px solid #654321; ${a%2===0?"background: rgba(139, 69, 19, 0.1);":""}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <span style="font-size: 18px;">${e.type}</span>
                    <span style="font-size: 12px; color: #c4a374;">${e.time}</span>
                </div>
                <p style="margin: 0; font-size: 14px; color: #e6d3a3; line-height: 1.4;">${e.message}</p>
            </div>
        `).join("")}formatNumber(t){return t.toLocaleString()}generateTransactionList(){return[{date:"2 hours ago",description:"OpenAI API Usage",amount:-23.47,category:"AI/Tools"},{date:"Yesterday",description:"Facebook Ads - Lead Gen",amount:-15,category:"Marketing"},{date:"Yesterday",description:"Kalshi Withdrawal",amount:125,category:"Trading"},{date:"Feb 14",description:"Chase Bank Interest",amount:2.34,category:"Interest"},{date:"Feb 13",description:"Digital Ocean Hosting",amount:-20,category:"Infrastructure"}].map((e,a)=>`
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; ${a%2===0?"background: rgba(255, 255, 255, 0.05);":""}">
                <div>
                    <div style="color: var(--lodge-light); font-size: 14px; font-weight: 500; margin-bottom: 2px;">${e.description}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px;">${e.date} • ${e.category}</div>
                </div>
                <div style="color: ${e.amount>0?"#32cd32":"#ff6b35"}; font-size: 14px; font-weight: 600; font-family: 'JetBrains Mono', monospace;">
                    ${e.amount>0?"+":""}$${Math.abs(e.amount).toFixed(2)}
                </div>
            </div>
        `).join("")}generateCampaignStatus(){return[{name:"Ellis County Direct Mail",status:"active",sent:2847,responses:23,cost:847.5},{name:"Dallas FB Lead Ads",status:"active",sent:1205,responses:8,cost:156},{name:"SMS Follow-up Sequence",status:"scheduled",sent:0,responses:0,cost:0}].map(e=>{const a=e.sent>0?(e.responses/e.sent*100).toFixed(2):"0.00",s=e.status==="active"?"#32cd32":"#ffd700";return`
                <div style="padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.name}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-top: 2px;">
                            ${e.sent} sent • ${e.responses} responses • ${a}% rate
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${s}; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                            ${e.status}
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                            $${e.cost.toFixed(2)}
                        </div>
                    </div>
                </div>
            `}).join("")}generateDealPipeline(){return`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ffd700;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">🔍 Prospecting</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">18</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Active leads</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff8c00;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📞 Contacted</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">12</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Follow-ups due</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #ff6b35;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">📋 Negotiating</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">5</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Offers out</div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; border-top: 4px solid #32cd32;">
                    <h5 style="color: var(--lodge-light); margin: 0 0 8px 0; font-size: 14px;">✅ Under Contract</h5>
                    <div style="color: var(--lodge-accent); font-size: 20px; font-weight: 700; margin-bottom: 4px;">3</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 11px;">Closing this week</div>
                </div>
            </div>
        `}switchReportTab(t){document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),event.target.classList.add("active"),console.log(`Switching to ${t} reports`)}loadMoreReports(){console.log("Loading more reports...")}generateEmailList(){return[{from:"Lead Response System",subject:"URGENT: 3 Property Owners Responded",time:"8 min ago",priority:"high",preview:"Multiple responses to Dallas County mailer campaign..."},{from:"County Records Alert",subject:"New Foreclosure Filings - Ellis County",time:"2 hours ago",priority:"high",preview:"12 new pre-foreclosure properties match your criteria..."},{from:"OpenAI Billing",subject:"Usage Alert: 80% of Monthly Limit",time:"4 hours ago",priority:"medium",preview:"Your API usage is approaching the monthly limit..."},{from:"John Martinez",subject:"RE: 456 Pine Street Property Inquiry",time:"6 hours ago",priority:"high",preview:"Yes, I am interested in selling. Can we meet this week?"},{from:"Marketing Campaign",subject:"Weekly Performance Report",time:"Yesterday",priority:"low",preview:"Facebook campaigns generated 23 leads this week..."}].map(e=>{const a={high:"#ff4444",medium:"#ffd700",low:"#32cd32"}[e.priority];return`
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; transition: background 0.2s;" 
                     onmouseover="this.style.background='rgba(255, 255, 255, 0.05)'" 
                     onmouseout="this.style.background='transparent'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.from}</div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${e.time}</div>
                            <div style="width: 6px; height: 6px; background: ${a}; border-radius: 50%; margin-left: auto; margin-top: 4px;"></div>
                        </div>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; margin-bottom: 4px; font-weight: 500;">${e.subject}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px; line-height: 1.3;">${e.preview}</div>
                </div>
            `}).join("")}generateTodaysCalendar(){return`
            <div style="color: var(--lodge-light); font-weight: 600; margin-bottom: 16px;">${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
            ${[{time:"9:00 AM",title:"Swimming Training",type:"workout",duration:"45 min"},{time:"11:30 AM",title:"Property Walk-through",type:"business",duration:"1 hour",location:"123 Oak St"},{time:"2:00 PM",title:"Seller Call - Martinez",type:"business",duration:"30 min"},{time:"4:00 PM",title:"Weekly Team Standup",type:"meeting",duration:"30 min"}].map(a=>`
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <div style="color: ${{workout:"#ff4500",business:"#32cd32",meeting:"#ffd700"}[a.type]}; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; min-width: 60px;">
                            ${a.time}
                        </div>
                        <div style="flex: 1;">
                            <div style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${a.title}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">
                                ${a.duration}${a.location?" • "+a.location:""}
                            </div>
                        </div>
                    </div>
                `).join("")}
        `}generateWeekPreview(){return[{day:"Tue",count:2,highlight:"Contract Review Meeting"},{day:"Wed",count:4,highlight:"3 Property Showings"},{day:"Thu",count:1,highlight:"Ironman Training Block"},{day:"Fri",count:3,highlight:"Team Performance Review"},{day:"Sat",count:1,highlight:"Long Training Session"}].map((e,a)=>`
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.day}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">${e.highlight}</div>
                    </div>
                    <div style="background: var(--lodge-accent); color: white; padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: 600;">
                        ${e.count}
                    </div>
                </div>
            </div>
        `).join("")}generateWeeklyPlan(){return[{day:"Mon",workout:"Swimming - Base",status:"complete",duration:"45 min"},{day:"Tue",workout:"Running - Intervals",status:"scheduled",duration:"60 min"},{day:"Wed",workout:"Cycling - Endurance",status:"scheduled",duration:"90 min"},{day:"Thu",workout:"Swimming - Speed",status:"scheduled",duration:"45 min"},{day:"Fri",workout:"Brick Training",status:"scheduled",duration:"75 min"},{day:"Sat",workout:"Long Run",status:"scheduled",duration:"120 min"},{day:"Sun",workout:"Recovery/Yoga",status:"scheduled",duration:"30 min"}].map((e,a)=>{const s=e.status==="complete"?"#32cd32":e.status==="scheduled"?"#ffd700":"#888";return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.day}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">${e.workout} • ${e.duration}</div>
                        </div>
                        <div style="background: ${s}; color: white; padding: 3px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                            ${e.status}
                        </div>
                    </div>
                </div>
            `}).join("")}generateRecentWorkouts(){return[{date:"Today",type:"Swimming",distance:"2000m",time:"31:45",hr:"142 avg",quality:"excellent"},{date:"Yesterday",type:"Running",distance:"8.2 km",time:"42:15",hr:"156 avg",quality:"good"},{date:"Feb 14",type:"Cycling",distance:"45 km",time:"1:38:22",hr:"148 avg",quality:"good"},{date:"Feb 13",type:"Swimming",distance:"1500m",time:"24:30",hr:"138 avg",quality:"excellent"}].map((e,a)=>{const s={excellent:"#32cd32",good:"#ffd700",fair:"#ff8c00",poor:"#ff4444"}[e.quality];return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${e.type}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 11px;">${e.date}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                                ${e.distance} • ${e.time}
                            </div>
                            <div style="color: ${s}; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                                ${e.quality}
                            </div>
                        </div>
                    </div>
                </div>
            `}).join("")}getTrainingRoomContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🏋️ Training Room</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Ironman Training Command</p>
            </div>
            
            <!-- Today's Workout -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; border-left: 4px solid var(--lodge-accent);">
                <h4 style="color: var(--lodge-accent); margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">🎯 Today's Mission</h4>
                <div style="color: var(--lodge-light); font-size: 16px; font-weight: 600; margin-bottom: 8px;">Swimming - Endurance Base</div>
                <div style="color: var(--lodge-text-secondary); font-size: 14px; margin-bottom: 16px;">45 minutes • Zone 2 aerobic base building</div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">2000m</span>
                        <div class="stat-label" style="font-size: 11px;">Target Distance</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">1:35/100m</span>
                        <div class="stat-label" style="font-size: 11px;">Target Pace</div>
                    </div>
                    <div class="stat-card" style="padding: 12px;">
                        <span class="stat-value" style="font-size: 16px; color: var(--lodge-accent);">140-150</span>
                        <div class="stat-label" style="font-size: 11px;">Target HR</div>
                    </div>
                </div>
                
                <div style="margin-top: 16px;">
                    <button class="lodge-btn" style="width: 100%; background: linear-gradient(135deg, #32cd32, #228b22);" onclick="window.lodgeUI.startWorkout()">
                        🏊‍♂️ Start Workout
                    </button>
                </div>
            </div>
            
            <!-- This Week's Plan -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📅 Training Plan (Week 8)</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateWeeklyPlan()}
            </div>
            
            <!-- Recent Performance -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📈 Recent Sessions</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateRecentWorkouts()}
            </div>
            
            <!-- Progress Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">12/14</span>
                    <div class="stat-label">Workouts This Month</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">8.2 hrs</span>
                    <div class="stat-label">Weekly Volume</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-gold);">92%</span>
                    <div class="stat-label">Plan Compliance</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #ff6b35;">23w</span>
                    <div class="stat-label">Until Race Day</div>
                </div>
            </div>
            
            <!-- Quick Log -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📝 Quick Log</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 16px;">
                    <input type="number" placeholder="Distance (m)" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                    <input type="text" placeholder="Time (mm:ss)" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                    <input type="number" placeholder="Avg HR" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: var(--lodge-light); font-size: 14px;">
                </div>
                <button class="lodge-btn" style="width: 100%; font-size: 14px;" onclick="window.lodgeUI.logWorkout()">
                    📊 Log Workout
                </button>
            </div>
        `}setupPanelInteractions(t){t==="desk"&&(window.lodgeUI.expandProject=e=>{const a=document.getElementById("wholesaling-kanban");a&&(a.style.display=a.style.display==="none"?"block":"none")}),window.lodgeUI.startWorkout=()=>{alert("Starting workout timer! (Would integrate with fitness app/tracker)")},window.lodgeUI.logWorkout=()=>{alert("Workout logged! (Would save to training database)")}}generateBudgetTracking(){return[{category:"AI/Software",budgeted:200,actual:170,color:"#32cd32"},{category:"Marketing",budgeted:150,actual:65,color:"#32cd32"},{category:"Infrastructure",budgeted:75,actual:50,color:"#32cd32"},{category:"Training/Health",budgeted:100,actual:125,color:"#ff8c00"},{category:"Misc/Other",budgeted:50,actual:35,color:"#32cd32"}].map(e=>{const a=e.actual/e.budgeted*100,s=a>100?"#ff6b35":a>80?"#ff8c00":"#32cd32";return`
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${e.category}</span>
                        <span style="color: ${s}; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">
                            $${e.actual} / $${e.budgeted}
                        </span>
                    </div>
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 8px; height: 6px;">
                        <div style="width: ${Math.min(a,100)}%; background: ${s}; height: 100%; border-radius: 8px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 2px;">
                        <span style="color: var(--lodge-text-secondary); font-size: 11px;">${a.toFixed(0)}% of budget</span>
                    </div>
                </div>
            `}).join("")}getWatchtowerContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">⚠️ Watchtower</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Critical Alerts & Monitoring</p>
            </div>
            
            <!-- Critical Alerts -->
            <h4 style="color: #ff4444; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🚨 Critical Alerts</h4>
            <div style="background: linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1)); border: 1px solid #ff4444; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 8px; height: 8px; background: #ff4444; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">Property Owner Response URGENT</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">456 Oak Street - Owner wants to meet TODAY</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background: #ff8c00; border-radius: 50%;"></div>
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">API Usage Alert</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">OpenAI usage at 85% - billing cycle ends in 3 days</div>
                    </div>
                </div>
            </div>
            
            <!-- System Status -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🖥️ System Status</h4>
            <div class="stats-grid" style="margin-bottom: 20px;">
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">99.2%</span>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: #32cd32;">142ms</span>
                    <div class="stat-label">Avg Response</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-accent);">847</span>
                    <div class="stat-label">API Calls/hr</div>
                </div>
                <div class="stat-card">
                    <span class="stat-value" style="color: var(--lodge-text-secondary);">12GB</span>
                    <div class="stat-label">Storage Used</div>
                </div>
            </div>
            
            <!-- Monitoring Feeds -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📡 Live Monitoring</h4>
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                ${this.generateMonitoringFeed()}
            </div>
        `}generateMonitoringFeed(){return[{time:"30s ago",type:"success",message:"Lead processing batch completed: 47 new prospects analyzed",source:"Scout"},{time:"2m ago",type:"warning",message:"Email delivery rate dropped to 87% (threshold: 90%)",source:"Marketing"},{time:"5m ago",type:"info",message:"Database optimization completed: 23% performance improvement",source:"Builder"},{time:"8m ago",type:"success",message:"Tim completed 3 seller calls - 2 appointments scheduled",source:"CRM"},{time:"12m ago",type:"warning",message:"API rate limit approaching: 89% of hourly limit",source:"System"}].map((e,a)=>{const s={success:"#32cd32",warning:"#ff8c00",error:"#ff4444",info:"#00ced1"}[e.type];return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 6px; height: 6px; background: ${s}; border-radius: 50%;"></div>
                            <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${e.source}</span>
                        </div>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${e.time}</span>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; line-height: 1.4; margin-left: 14px;">
                        ${e.message}
                    </div>
                </div>
            `}).join("")}getLoungeContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">🎵 Lounge</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Music & Relaxation</p>
            </div>
            
            <!-- Now Playing -->
            <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🎵</div>
                <h4 style="color: #32cd32; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Now Playing</h4>
                <div style="color: var(--lodge-light); font-size: 16px; font-weight: 500; margin-bottom: 4px;">"Eye of the Tiger"</div>
                <div style="color: var(--lodge-text-secondary); font-size: 14px; margin-bottom: 16px;">Survivor • Greatest Hits</div>
                
                <div style="margin: 20px 0;">
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 12px; height: 6px;">
                        <div style="width: 45%; background: #32cd32; height: 100%; border-radius: 12px;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                        <span>1:42</span>
                        <span>3:47</span>
                    </div>
                </div>
            </div>
            
            <!-- Playlists -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">🎶 Playlists</h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px;">
                <button class="lodge-btn" style="justify-content: flex-start; text-align: left; padding: 16px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🏹 Hunt Mode</div>
                        <div style="font-size: 12px; opacity: 0.7;">Focus music for deep work • 47 tracks</div>
                    </div>
                </button>
                
                <button class="lodge-btn" style="justify-content: flex-start; text-align: left; padding: 16px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🔥 Pump Up</div>
                        <div style="font-size: 12px; opacity: 0.7;">Motivational workout tracks • 23 tracks</div>
                    </div>
                </button>
            </div>
        `}getLibraryContent(){return`
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: var(--lodge-accent); margin-bottom: 8px; font-size: 24px; font-weight: 700;">📚 Library</h3>
                <p style="color: var(--lodge-text-secondary); font-size: 14px;">Knowledge Base & Documents</p>
            </div>
            
            <!-- Quick Search -->
            <div style="margin-bottom: 20px;">
                <input type="text" placeholder="🔍 Search documents, contracts, playbooks..." style="width: 100%; padding: 12px 16px; background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; color: var(--lodge-light); font-size: 14px;">
            </div>
            
            <!-- Document Categories -->
            <h4 style="color: var(--lodge-accent); margin: 20px 0 12px 0; font-size: 16px; font-weight: 600;">📁 Document Categories</h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px;">
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">📋 Real Estate Contracts</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Purchase agreements, assignments</div>
                        </div>
                        <div style="color: var(--lodge-accent); font-weight: 600; font-size: 14px;">23</div>
                    </div>
                </div>
                
                <div style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">🎯 Marketing Playbooks</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">Campaign strategies, scripts</div>
                        </div>
                        <div style="color: var(--lodge-accent); font-weight: 600; font-size: 14px;">15</div>
                    </div>
                </div>
            </div>
        `}}const m=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||"ontouchstart"in window||navigator.maxTouchPoints>0,M={type:l.AUTO,width:1200,height:800,parent:"game-container",backgroundColor:"#0a1f0a",physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scale:{mode:l.Scale.FIT,autoCenter:l.Scale.CENTER_BOTH,min:{width:800,height:600},max:{width:1600,height:1200}},scene:C},T=new l.Game(M),z=new S(m);window.lodgeGame=T;window.lodgeUI=z;window.isMobile=m;m&&(document.getElementById("mobile-controls").style.display="block");console.log("🏕️ The Lodge initialized successfully!");
