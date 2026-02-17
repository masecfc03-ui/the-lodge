import{r as m,g as x}from"./phaser-DFK5Ua9d.js";import{n as b}from"./nipplejs-J1xnI5EH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();var f=m();const d=x(f);class w extends d.Scene{constructor(){super({key:"GameScene"}),this.roomWidth=400,this.roomHeight=300,this.wallThickness=30,this.rooms={"Training Room":{x:230,y:180,object:{x:230,y:180,type:"training"},color:"#3d2214",baseColor:4006420},"War Room":{x:630,y:180,object:{x:630,y:180,type:"desk"},color:"#3e2415",baseColor:4072469},Barracks:{x:1030,y:180,object:{x:1030,y:180,type:"bunks"},color:"#3f2516",baseColor:4138262},Treasury:{x:230,y:480,object:{x:230,y:480,type:"safe"},color:"#402617",baseColor:4204055},"Main Hall":{x:630,y:480,object:{x:630,y:480,type:"dashboard"},color:"#412718",baseColor:4269848},"Command Center":{x:1030,y:480,object:{x:1030,y:480,type:"radio"},color:"#422819",baseColor:4335641},Lounge:{x:230,y:780,object:{x:230,y:780,type:"jukebox"},color:"#43291a",baseColor:4401434},Library:{x:630,y:780,object:{x:630,y:780,type:"bookshelf"},color:"#442a1b",baseColor:4467227},Watchtower:{x:1030,y:780,object:{x:1030,y:780,type:"monitors"},color:"#452b1c",baseColor:4533020}},this.currentRoom="Main Hall",this.nearObject=null,this.particles=[],this.ambientParticles=[],this.lightSources=[],this.shadows=[],this.roomTransitioning=!1}preload(){this.createWoodTexture(),this.createStoneTexture(),this.createMetalTexture(),this.createLeatherTexture()}createWoodTexture(){const e=this.add.graphics(),t=this.textures.createCanvas("wood",256,256),o=t.getSourceImage().getContext("2d"),s=o.createLinearGradient(0,0,0,256);s.addColorStop(0,"#5D3A1A"),s.addColorStop(.3,"#6B4423"),s.addColorStop(.7,"#7A502C"),s.addColorStop(1,"#8B5A2B"),o.fillStyle=s,o.fillRect(0,0,256,256);for(let i=0;i<50;i++){const r=i/50*256,n=Math.sin(r*.02)*10,l=.1+Math.random()*.2;o.strokeStyle=`rgba(45, 30, 15, ${l})`,o.lineWidth=1+Math.random()*2,o.beginPath(),o.moveTo(n,r),o.lineTo(256+n,r),o.stroke()}for(let i=0;i<8;i++){const r=Math.random()*256,n=Math.random()*256,l=10+Math.random()*20;o.fillStyle="rgba(45, 30, 15, 0.3)",o.beginPath(),o.ellipse(r,n,l,l*.6,Math.random()*Math.PI,0,Math.PI*2),o.fill()}t.refresh(),e.destroy()}createStoneTexture(){const e=this.textures.createCanvas("stone",256,256),a=e.getSourceImage().getContext("2d");a.fillStyle="#4A4A4A",a.fillRect(0,0,256,256);for(let o=0;o<256;o+=2)for(let s=0;s<256;s+=2){const i=.3+Math.random()*.4,r=Math.floor(74*i);a.fillStyle=`rgb(${r}, ${r}, ${r})`,a.fillRect(o,s,2,2)}for(let o=0;o<20;o++)a.strokeStyle=`rgba(30, 30, 30, ${.3+Math.random()*.4})`,a.lineWidth=1,a.beginPath(),a.moveTo(Math.random()*256,Math.random()*256),a.lineTo(Math.random()*256,Math.random()*256),a.stroke();e.refresh()}createMetalTexture(){const e=this.textures.createCanvas("metal",256,256),a=e.getSourceImage().getContext("2d"),o=a.createLinearGradient(0,0,256,256);o.addColorStop(0,"#CD7F32"),o.addColorStop(.5,"#B8860B"),o.addColorStop(1,"#DAA520"),a.fillStyle=o,a.fillRect(0,0,256,256);for(let s=0;s<30;s++){const i=Math.random()*256,r=Math.random()*256,n=2+Math.random()*8;a.fillStyle=`rgba(255, 255, 255, ${.1+Math.random()*.3})`,a.beginPath(),a.ellipse(i,r,n,n*.3,Math.random()*Math.PI,0,Math.PI*2),a.fill()}e.refresh()}createLeatherTexture(){const e=this.textures.createCanvas("leather",256,256),a=e.getSourceImage().getContext("2d");a.fillStyle="#8B4513",a.fillRect(0,0,256,256);for(let o=0;o<256;o+=3)for(let s=0;s<256;s+=3){const i=-20+Math.random()*40,r=Math.max(0,Math.min(255,139+i)),n=Math.max(0,Math.min(255,69+i)),l=Math.max(0,Math.min(255,19+i));a.fillStyle=`rgb(${r}, ${n}, ${l})`,a.fillRect(o,s,3,3)}e.refresh()}create(){this.createAmbientLighting(),this.createRooms(),this.createPlayer(),this.interactiveObjects=this.physics.add.group(),this.createInteractiveObjects(),this.setupInput(),window.isMobile&&this.setupMobileControls(),this.createWorldBackground(),this.setupCamera(),this.createAtmosphericParticles(),this.createLightingSystem(),this.updateCurrentRoom(),console.log("🎮 Enhanced Lodge scene created successfully!")}createAmbientLighting(){this.ambientLight=this.add.rectangle(650,500,1300,1e3,0,.3),this.ambientLight.setBlendMode(d.BlendModes.MULTIPLY)}createWorldBackground(){const e=this.add.graphics();e.fillGradientStyle(663306,663306,1452566,1452566,1),e.fillRect(0,0,1300,1e3),e.fillStyle(0,.4),e.fillRect(25,25,1250,950),e.fillGradientStyle(5913130,4860442,3807754,2759178,1),e.fillRect(30,30,1240,940),this.worldBackground=e}createPlayer(){this.player=this.add.circle(630,480,18,3329330),this.playerGlow=this.add.circle(630,480,25,3329330,.3),this.playerGlow.setBlendMode(d.BlendModes.ADD),this.playerLabel=this.add.text(630,480,"M",{fontSize:"20px",fontFamily:"Arial Black, sans-serif",color:"#ffffff",fontWeight:"bold",stroke:"#000000",strokeThickness:2}).setOrigin(.5),this.physics.add.existing(this.player),this.player.body.setCollideWorldBounds(!0),this.player.body.setSize(36,36),this.playerTrail=[];for(let e=0;e<5;e++){const t=this.add.circle(630,480,16-e*2,3329330,.8-e*.15);t.visible=!1,t.setBlendMode(d.BlendModes.ADD),this.playerTrail.push(t)}}createRooms(){this.roomGraphics=this.add.group(),this.wallsGroup=this.physics.add.staticGroup(),this.roomFloors=this.add.group(),Object.entries(this.rooms).forEach(([e,t])=>{const a=t.x,o=t.y,s=this.roomWidth,i=this.roomHeight;this.createRoomFloor(a,o,s,i,t),this.createRoomAmbience(a,o,s,i,t);const r=this.add.rectangle(a,o-i/2+35,200,30,2955280,.9);r.setStroke(9127187,2);const n=this.add.text(a,o-i/2+35,e,{fontSize:"16px",fontFamily:"Arial Black, sans-serif",color:"#e6d3a3",fontWeight:"bold",stroke:"#2d1810",strokeThickness:2}).setOrigin(.5);this.roomGraphics.add(r),this.roomGraphics.add(n)}),this.createEnhancedWalls(),this.physics.world.setBounds(0,0,1300,1e3)}createRoomFloor(e,t,a,o,s){const i=this.add.tileSprite(e,t,a,o,"wood");i.setTint(s.baseColor);const r=this.add.graphics();r.lineStyle(1,0,.1);const n=25;for(let c=-o/2;c<o/2;c+=n){const p=t+c;r.moveTo(e-a/2,p),r.lineTo(e+a/2,p)}r.strokePath();const l=this.add.graphics();l.fillGradientStyle(s.baseColor,s.baseColor,d.Display.Color.GetColor32(0,0,0,.3),d.Display.Color.GetColor32(0,0,0,.3),.7),l.fillRect(e-a/2,t-o/2,a,o),l.setBlendMode(d.BlendModes.MULTIPLY),this.roomFloors.add(i),this.roomFloors.add(r),this.roomFloors.add(l)}createRoomAmbience(e,t,a,o,s){const i=this.add.circle(e,t,Math.max(a,o)*.6,16753920,.05);i.setBlendMode(d.BlendModes.ADD);const r=this.add.graphics();r.fillStyle(0,.4);const n=40;r.fillTriangle(e-a/2,t-o/2,e-a/2+n,t-o/2,e-a/2,t-o/2+n),r.fillTriangle(e+a/2,t-o/2,e+a/2-n,t-o/2,e+a/2,t-o/2+n),r.fillTriangle(e-a/2,t+o/2,e-a/2+n,t+o/2,e-a/2,t+o/2-n),r.fillTriangle(e+a/2,t+o/2,e+a/2-n,t+o/2,e+a/2,t+o/2-n),this.roomGraphics.add(i),this.roomGraphics.add(r)}createEnhancedWalls(){const e=this.wallThickness,t=(s,i,r,n)=>{const l=this.add.rectangle(s+2,i+2,r,n,0,.5),c=this.add.tileSprite(s,i,r,n,"stone");c.setTint(3087124);const p=this.add.rectangle(s-1,i-1,r-2,n-2,0,0);return p.setStrokeStyle(1,9127187,.6),this.physics.add.existing(c,!0),this.wallsGroup.add(c),{shadow:l,wall:c,highlight:p}},a=[{x:230,y:180},{x:630,y:180},{x:1030,y:180},{x:230,y:480},{x:630,y:480},{x:1030,y:480},{x:230,y:780},{x:630,y:780},{x:1030,y:780}],o=60;t(630,30,1200,e),t(630,930,1200,e),t(30,480,e,840),t(1230,480,e,840),a.forEach((s,i)=>{if(i<6){const r=s.y+this.roomHeight/2+e/2;t(s.x-this.roomWidth/2+(this.roomWidth-o)/4,r,(this.roomWidth-o)/2,e),t(s.x+this.roomWidth/2-(this.roomWidth-o)/4,r,(this.roomWidth-o)/2,e)}}),a.forEach((s,i)=>{if(i%3!==2){const r=s.x+this.roomWidth/2+e/2;t(r,s.y-this.roomHeight/2+(this.roomHeight-o)/4,e,(this.roomHeight-o)/2),t(r,s.y+this.roomHeight/2-(this.roomHeight-o)/4,e,(this.roomHeight-o)/2)}}),this.physics.add.collider(this.player,this.wallsGroup)}createInteractiveObjects(){Object.entries(this.rooms).forEach(([e,t])=>{t.object.type!=="spawn"&&this.createEnhancedObject(t,e)})}createEnhancedObject(e,t){const a=e.object.x,o=e.object.y,s=e.object.type,i=this.getObjectColor(s),r=5,n=this.add.ellipse(a+r,o+r,70,35,0,.4),l=this.add.circle(a,o,30,i);this.getObjectTexture(s)&&l.setTexture(this.getObjectTexture(s));const c=this.add.circle(a,o,35,i,.3);c.setBlendMode(d.BlendModes.ADD);const p=this.add.circle(a,o,32,0,0);p.setStrokeStyle(3,16766720,.8);const v=this.getObjectEmoji(s),g=this.add.text(a+1,o+1,v,{fontSize:"26px",fontFamily:"Arial, sans-serif",color:"#000000"}).setOrigin(.5).setAlpha(.3),h=this.add.text(a,o,v,{fontSize:"26px",fontFamily:"Arial, sans-serif"}).setOrigin(.5);s==="training"?this.createTrainingEffect(a,o):s==="monitors"&&this.createAlertEffect(a,o),this.physics.add.existing(l),l.body.setImmovable(!0),l.roomName=t,l.objectType=s,l.emoji=h,l.glow=c,l.highlight=p,l.shadow=n,this.interactiveObjects.add(l),this.tweens.add({targets:[c,p],alpha:{from:.8,to:.3},scaleX:{from:1,to:1.2},scaleY:{from:1,to:1.2},duration:2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:[h,g],y:{from:o-3,to:o+3},duration:3e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.tweens.add({targets:p,rotation:Math.PI*2,duration:8e3,repeat:-1,ease:"Linear"})}createTrainingEffect(e,t){for(let a=0;a<12;a++)setTimeout(()=>{const o=this.add.circle(e+(Math.random()-.5)*25,t+5,1+Math.random()*2,d.Math.RND.pick([16729344,16747520,16766720]),.7);o.setBlendMode(d.BlendModes.ADD),this.tweens.add({targets:o,y:t-30-Math.random()*25,x:e+(Math.random()-.5)*35,alpha:0,duration:1500+Math.random()*800,ease:"Quad.easeOut",onComplete:()=>o.destroy()})},Math.random()*2500);setTimeout(()=>this.createTrainingEffect(e,t),3500)}createAlertEffect(e,t){const a=this.add.circle(e,t,8,16729156,.6);a.setBlendMode(d.BlendModes.ADD),this.tweens.add({targets:a,scaleX:2,scaleY:2,alpha:0,duration:1e3,ease:"Quad.easeOut",onComplete:()=>{a.destroy(),setTimeout(()=>this.createAlertEffect(e,t),2e3+Math.random()*3e3)}})}createAtmosphericParticles(){for(let e=0;e<80;e++){const t=this.add.circle(d.Math.Between(50,1250),d.Math.Between(50,950),d.Math.Between(1,3),14540253,d.Math.FloatBetween(.1,.3));t.setBlendMode(d.BlendModes.ADD),this.tweens.add({targets:t,y:t.y-d.Math.Between(30,100),x:t.x+(Math.random()-.5)*50,alpha:{from:t.alpha,to:.05},duration:d.Math.Between(15e3,25e3),repeat:-1,yoyo:!0,ease:"Sine.easeInOut"}),this.ambientParticles.push(t)}}createLightingSystem(){Object.entries(this.rooms).forEach(([e,t])=>{const a=this.add.circle(t.x,t.y-50,150,16753920,.1);a.setBlendMode(d.BlendModes.ADD),this.tweens.add({targets:a,alpha:{from:.08,to:.15},scaleX:{from:.9,to:1.1},scaleY:{from:.9,to:1.1},duration:3e3+Math.random()*2e3,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"}),this.lightSources.push(a)})}setupCamera(){this.cameras.main.startFollow(this.player,!0,.08,.08);const e=window.isMobile?1.5:1.2;this.cameras.main.setZoom(e),this.time.addEvent({delay:8e3,callback:()=>{this.cameras.main.shake(50,.002)},loop:!0})}getObjectColor(e){return{training:16729344,desk:16739125,bunks:4620980,safe:16766720,dashboard:3329330,radio:52945,jukebox:16716947,bookshelf:9127187,monitors:16729156}[e]||16747520}getObjectTexture(e){return{training:"metal",desk:"wood",bunks:"leather",safe:"metal",dashboard:"stone",radio:"metal",jukebox:"metal",bookshelf:"wood",monitors:"metal"}[e]||null}getObjectEmoji(e){return{training:"🏋️",desk:"🎯",bunks:"👥",safe:"💰",dashboard:"📊",radio:"📧",jukebox:"🎵",bookshelf:"📚",monitors:"⚠️"}[e]||"❓"}setupInput(){this.cursors=this.input.keyboard.createCursorKeys(),this.wasd=this.input.keyboard.addKeys("W,S,A,D"),this.interact=this.input.keyboard.addKey("E"),this.interact.on("down",()=>{this.handleInteraction()}),this.input.keyboard.addKey("ESC").on("down",()=>{window.lodgeUI.closePanel()})}setupMobileControls(){const e=b.create({zone:document.getElementById("joystick-area"),mode:"static",position:{left:"60px",top:"60px"},color:"orange",size:80});this.joystickData={x:0,y:0},e.on("move",(t,a)=>{const o=Math.min(a.force,1),s=a.angle.radian;this.joystickData.x=Math.cos(s)*o,this.joystickData.y=-Math.sin(s)*o}),e.on("end",()=>{this.joystickData.x=0,this.joystickData.y=0}),document.getElementById("interact-btn").addEventListener("touchstart",t=>{t.preventDefault(),this.handleInteraction()})}update(){let t=0,a=0;if(window.isMobile&&(this.joystickData.x!==0||this.joystickData.y!==0)?(t=this.joystickData.x*160,a=this.joystickData.y*160):(this.cursors.left.isDown||this.wasd.A.isDown?t=-160:(this.cursors.right.isDown||this.wasd.D.isDown)&&(t=160),this.cursors.up.isDown||this.wasd.W.isDown?a=-160:(this.cursors.down.isDown||this.wasd.S.isDown)&&(a=160)),this.player.body.setVelocity(t,a),this.playerGlow.setPosition(this.player.x,this.player.y),this.playerLabel.setPosition(this.player.x,this.player.y),t!==0||a!==0){if(this.playerTrail.forEach((s,i)=>{s.visible=!0;const r=(i+1)*60;this.time.delayedCall(r,()=>{s.setPosition(this.player.x,this.player.y)})}),Math.random()<.3){const s=this.add.circle(this.player.x+(Math.random()-.5)*20,this.player.y+15,2,9127187,.6);this.tweens.add({targets:s,alpha:0,scaleX:.2,scaleY:.2,duration:500,onComplete:()=>s.destroy()})}}else this.playerTrail.forEach(s=>{s.visible=!1});this.updateCurrentRoom(),this.checkNearbyObjects(),this.updateObjectHoverEffects()}updateObjectHoverEffects(){this.interactiveObjects.children.entries.forEach(e=>{d.Math.Distance.Between(this.player.x,this.player.y,e.x,e.y)<80?(e.glow.setAlpha(.6),e.highlight.setAlpha(1)):(e.glow.setAlpha(.3),e.highlight.setAlpha(.8))})}updateCurrentRoom(){let e=null;const t=this.player.x,a=this.player.y;Object.entries(this.rooms).forEach(([o,s])=>{t>=s.x-this.roomWidth/2&&t<=s.x+this.roomWidth/2&&a>=s.y-this.roomHeight/2&&a<=s.y+this.roomHeight/2&&(e=o)}),e&&e!==this.currentRoom&&this.transitionToRoom(e)}transitionToRoom(e){if(this.roomTransitioning)return;this.roomTransitioning=!0,this.currentRoom=e;const t=this.add.rectangle(650,500,1300,1e3,0,0);this.tweens.add({targets:t,alpha:.3,duration:200,yoyo:!0,onComplete:()=>{t.destroy(),this.roomTransitioning=!1}}),document.getElementById("room-name").textContent=this.currentRoom,window.lodgeUI&&window.lodgeUI.updateMinimap(this.currentRoom,this.player.x,this.player.y),this.adjustRoomLighting(e)}adjustRoomLighting(e){if(!this.rooms[e])return;const a={"Training Room":.2,"Main Hall":.25,"War Room":.35,Watchtower:.4,Treasury:.3,"Command Center":.25,Barracks:.3,Library:.3,Lounge:.2};this.tweens.add({targets:this.ambientLight,alpha:a[e]||.3,duration:1e3,ease:"Sine.easeInOut"})}checkNearbyObjects(){let e=null,t=50;if(this.interactiveObjects.children.entries.forEach(a=>{const o=d.Math.Distance.Between(this.player.x,this.player.y,a.x,a.y);o<t&&(e=a,t=o)}),e!==this.nearObject){this.nearObject=e;const a=document.getElementById("interaction-prompt");this.nearObject?a.style.display="block":a.style.display="none"}}handleInteraction(){if(this.nearObject){const e=this.add.circle(this.nearObject.x,this.nearObject.y,10,16766720,.8);e.setBlendMode(d.BlendModes.ADD),this.tweens.add({targets:e,scaleX:3,scaleY:3,alpha:0,duration:300,onComplete:()=>e.destroy()}),window.lodgeUI.openPanel(this.nearObject.roomName,this.nearObject.objectType)}}}class k{constructor(e){this.isMobile=e,this.setupEventListeners(),this.startClock(),setTimeout(()=>{this.updateMinimap()},100)}setupEventListeners(){document.getElementById("close-panel").addEventListener("click",()=>{this.closePanel()}),document.getElementById("overlay").addEventListener("click",e=>{e.target.id==="overlay"&&this.closePanel()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.closePanel()})}startClock(){const e=()=>{const a=new Date().toLocaleTimeString("en-US",{hour12:!0,hour:"numeric",minute:"2-digit"}),o=document.getElementById("clock");o&&(o.textContent=a)};e(),setInterval(e,1e3)}updateMinimap(e="Main Hall",t=630,a=480){const o=document.getElementById("minimap");if(!o)return;const s=o.getContext("2d");s.fillStyle="#0a1f0a",s.fillRect(0,0,o.width,o.height),s.fillStyle="#3d2214",s.fillRect(10,5,160,110),s.strokeStyle="#654321",s.lineWidth=2,s.strokeRect(10,5,160,110);const i=50,r=33,n=15,l=10;[{name:"Base Camp",x:n,y:l},{name:"Projects",x:n+i,y:l},{name:"The Team",x:n+i*2,y:l},{name:"Treasury",x:n,y:l+r},{name:"Main Hall",x:n+i,y:l+r},{name:"Command Center",x:n+i*2,y:l+r},{name:"Jukebox",x:n,y:l+r*2},{name:"Field Journal",x:n+i,y:l+r*2},{name:"Trail Cams",x:n+i*2,y:l+r*2}].forEach(g=>{g.name===e&&(s.fillStyle="#ff8c00",s.fillRect(g.x-2,g.y-2,i-6,r-6)),s.strokeStyle="#654321",s.lineWidth=1,s.strokeRect(g.x,g.y,i-10,r-6),s.fillStyle="#e6d3a3",s.font="8px Courier New",s.fillText(g.name.substring(0,4),g.x+2,g.y+12)});const p=(t-30)/1240*160+10,v=(a-30)/940*110+5;s.fillStyle="#32cd32",s.beginPath(),s.arc(p,v,3,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.beginPath(),s.arc(p,v,3,0,Math.PI*2),s.stroke()}openPanel(e,t){const a=document.getElementById("panel"),o=document.getElementById("overlay"),s=document.getElementById("panel-title"),i=document.getElementById("panel-content");s.textContent=e,i.innerHTML=this.getPanelContent(e,t),o.style.display="block",setTimeout(()=>{a.classList.add("open")},10),this.setupPanelInteractions(t)}closePanel(){const e=document.getElementById("panel"),t=document.getElementById("overlay");e.classList.remove("open"),setTimeout(()=>{t.style.display="none"},300)}getPanelContent(e,t){switch(t){case"dashboard":return this.getMainHallContent();case"radio":return this.getCommandCenterContent();case"desk":return this.getWarRoomContent();case"safe":return this.getTreasuryContent();case"bunks":return this.getBarracksContent();case"training":return this.getTrainingRoomContent();case"jukebox":return this.getLoungeContent();case"bookshelf":return this.getLibraryContent();case"monitors":return this.getWatchtowerContent();default:return"<p>Welcome to The Lodge!</p>"}}getMainHallContent(){return`
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
        `}generateLeadsTable(){return[{address:"123 Oak Street",county:"Dallas",value:"$95,000",priority:"🔥",status:"New"},{address:"456 Pine Avenue",county:"Ellis",value:"$87,500",priority:"⭐",status:"Contacted"},{address:"789 Maple Drive",county:"Kaufman",value:"$102,000",priority:"🔥",status:"New"},{address:"321 Cedar Lane",county:"Dallas",value:"$78,000",priority:"💎",status:"Qualified"},{address:"654 Birch Way",county:"Ellis",value:"$91,200",priority:"⭐",status:"New"},{address:"987 Elm Court",county:"Kaufman",value:"$83,800",priority:"🔥",status:"Follow-up"},{address:"147 Ash Street",county:"Dallas",value:"$96,500",priority:"💎",status:"New"},{address:"258 Willow Ave",county:"Ellis",value:"$89,300",priority:"⭐",status:"Contacted"},{address:"369 Poplar Dr",county:"Kaufman",value:"$94,700",priority:"🔥",status:"New"},{address:"741 Spruce Ln",county:"Dallas",value:"$88,900",priority:"💎",status:"Qualified"}].map((t,a)=>`
            <div style="padding: 12px; border-bottom: 1px solid #654321; display: flex; justify-content: space-between; align-items: center; ${a%2===0?"background: rgba(139, 69, 19, 0.1);":""}">
                <div style="flex: 1;">
                    <div style="font-weight: bold; margin-bottom: 4px;">${t.priority} ${t.address}</div>
                    <div style="font-size: 12px; color: #c4a374;">${t.county} County • ${t.value}</div>
                </div>
                <div style="text-align: right; font-size: 12px;">
                    <div style="padding: 4px 8px; background: rgba(255, 140, 0, 0.3); border-radius: 12px; color: #ff8c00; font-weight: bold;">
                        ${t.status}
                    </div>
                </div>
            </div>
        `).join("")}generateReportsFeed(){return[{id:1,agent:"Scout",timestamp:"2026-02-16T17:45:00Z",source:"Discord #leads",type:"lead-report",priority:"high",content:"Found 12 new high-value properties in Ellis County. Average equity: $67K. 3 properties marked as urgent - owners responding to calls.",data:{leads:12,avgEquity:67e3,urgent:3}},{id:2,agent:"Builder",timestamp:"2026-02-16T17:30:00Z",source:"Terminal",type:"deployment",priority:"medium",content:"Lodge visual upgrade deployed successfully. Enhanced lighting, textures, and unified report system now live. Performance improved 23%.",data:{deploymentId:"lodge-v2.1",performance:"+23%"}},{id:3,agent:"Tim",timestamp:"2026-02-16T16:15:00Z",source:"Telegram DM",type:"pipeline-update",priority:"high",content:"Called 8 leads today. 3 verbal agreements for site visits. 2 properties ready for contract. Deal pipeline strong - $180K potential this week.",data:{callsMade:8,siteVisits:3,contracts:2,potentialValue:18e4}},{id:4,agent:"Tracker",timestamp:"2026-02-16T15:45:00Z",source:"Cron Job",type:"market-analysis",priority:"medium",content:"Market scan complete. Dallas County inventory down 15% this week. Prices trending up. Recommend increasing acquisition pace.",data:{inventoryChange:"-15%",priceDirection:"up",recommendation:"increase_pace"}},{id:5,agent:"Scout",timestamp:"2026-02-16T14:30:00Z",source:"Discord #alerts",type:"alert",priority:"urgent",content:"URGENT: 456 Oak Street owner just listed with realtor at $95K. Our analysis shows $45K equity. Move fast!",data:{property:"456 Oak Street",listPrice:95e3,equity:45e3,urgency:"high"}},{id:6,agent:"Builder",timestamp:"2026-02-16T13:20:00Z",source:"Discord #dev",type:"system-health",priority:"low",content:"All systems operational. Lead processing: 99.2% uptime. Email campaigns: 89% delivery rate. Database optimized.",data:{uptime:"99.2%",deliveryRate:"89%",dbStatus:"optimized"}},{id:7,agent:"Tim",timestamp:"2026-02-16T12:00:00Z",source:"Telegram Group",type:"daily-standup",priority:"medium",content:"Morning update: 5 appointments scheduled this week. 2 contracts in review. Need Builder to update CRM integration by Wed.",data:{appointments:5,contractsInReview:2,taskAssigned:"crm-integration"}}].map(t=>this.renderReport(t)).join("")}renderReport(e){const t=this.getTimeAgo(e.timestamp),a={urgent:"#ff4444",high:"#ff8c00",medium:"#ffd700",low:"#32cd32"}[e.priority]||"#888",o={"Discord #leads":"💬","Discord #alerts":"🚨","Discord #dev":"⚙️","Telegram DM":"📱","Telegram Group":"👥",Terminal:"💻","Cron Job":"🤖"}[e.source]||"📝",s={Scout:"#32cd32",Builder:"#00ced1",Tim:"#ff8c00",Tracker:"#9370db"}[e.agent]||"#888";return`
            <div class="report-item" style="background: var(--gradient-glass); backdrop-filter: var(--backdrop-blur); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 12px; border-left: 4px solid ${a};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${s}; font-weight: 600; font-size: 14px;">${e.agent}</span>
                        <span style="font-size: 12px;">${o}</span>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${e.source}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${t}</div>
                        <div style="background: ${a}; color: white; font-size: 9px; padding: 2px 6px; border-radius: 8px; font-weight: 600; margin-top: 2px; text-transform: uppercase;">${e.priority}</div>
                    </div>
                </div>
                
                <div style="color: var(--lodge-light); font-size: 14px; line-height: 1.5; margin-bottom: 8px;">
                    ${e.content}
                </div>
                
                ${e.data?this.renderReportData(e):""}
            </div>
        `}renderReportData(e){return e.data?`<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">${Object.entries(e.data).map(([a,o])=>{let s=o;return typeof o=="number"&&o>1e3&&(s=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(o)),`<span style="background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 6px; font-size: 11px; color: var(--lodge-text-secondary); font-family: 'JetBrains Mono', monospace;">${a}: ${s}</span>`}).join("")}</div>`:""}getTimeAgo(e){const t=new Date,a=new Date(e),o=t-a,s=Math.floor(o/(1e3*60)),i=Math.floor(o/(1e3*60*60)),r=Math.floor(o/(1e3*60*60*24));return s<1?"Just now":s<60?`${s}m ago`:i<24?`${i}h ago`:`${r}d ago`}generateNotificationFeed(){return[{time:"2 min ago",type:"🔥",message:"High-value property detected: 123 Oak St, Dallas County",category:"hot"},{time:"5 min ago",type:"📧",message:"Email response received from motivated seller",category:"response"},{time:"8 min ago",type:"⚙️",message:"Lead processing completed: 47 new prospects",category:"system"},{time:"12 min ago",type:"💰",message:"Deal potential flagged: $45K profit margin detected",category:"deal"},{time:"15 min ago",type:"🔍",message:"Scout identified 12 new properties in Ellis County",category:"hot"},{time:"18 min ago",type:"📱",message:"SMS campaign delivered: 89% open rate",category:"system"},{time:"22 min ago",type:"🏠",message:"Property analysis complete: 456 Pine Ave",category:"hot"},{time:"28 min ago",type:"💬",message:"Lead responded to follow-up call",category:"response"},{time:"32 min ago",type:"⚡",message:"System performance optimized: 23% faster processing",category:"system"},{time:"35 min ago",type:"🎯",message:"Marketing campaign ROI: 340% return detected",category:"deal"}].map((t,a)=>`
            <div style="padding: 12px; border-bottom: 1px solid #654321; ${a%2===0?"background: rgba(139, 69, 19, 0.1);":""}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <span style="font-size: 18px;">${t.type}</span>
                    <span style="font-size: 12px; color: #c4a374;">${t.time}</span>
                </div>
                <p style="margin: 0; font-size: 14px; color: #e6d3a3; line-height: 1.4;">${t.message}</p>
            </div>
        `).join("")}formatNumber(e){return e.toLocaleString()}generateTransactionList(){return[{date:"2 hours ago",description:"OpenAI API Usage",amount:-23.47,category:"AI/Tools"},{date:"Yesterday",description:"Facebook Ads - Lead Gen",amount:-15,category:"Marketing"},{date:"Yesterday",description:"Kalshi Withdrawal",amount:125,category:"Trading"},{date:"Feb 14",description:"Chase Bank Interest",amount:2.34,category:"Interest"},{date:"Feb 13",description:"Digital Ocean Hosting",amount:-20,category:"Infrastructure"}].map((t,a)=>`
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; ${a%2===0?"background: rgba(255, 255, 255, 0.05);":""}">
                <div>
                    <div style="color: var(--lodge-light); font-size: 14px; font-weight: 500; margin-bottom: 2px;">${t.description}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px;">${t.date} • ${t.category}</div>
                </div>
                <div style="color: ${t.amount>0?"#32cd32":"#ff6b35"}; font-size: 14px; font-weight: 600; font-family: 'JetBrains Mono', monospace;">
                    ${t.amount>0?"+":""}$${Math.abs(t.amount).toFixed(2)}
                </div>
            </div>
        `).join("")}generateCampaignStatus(){return[{name:"Ellis County Direct Mail",status:"active",sent:2847,responses:23,cost:847.5},{name:"Dallas FB Lead Ads",status:"active",sent:1205,responses:8,cost:156},{name:"SMS Follow-up Sequence",status:"scheduled",sent:0,responses:0,cost:0}].map(t=>{const a=t.sent>0?(t.responses/t.sent*100).toFixed(2):"0.00",o=t.status==="active"?"#32cd32":"#ffd700";return`
                <div style="padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${t.name}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; margin-top: 2px;">
                            ${t.sent} sent • ${t.responses} responses • ${a}% rate
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${o}; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                            ${t.status}
                        </div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                            $${t.cost.toFixed(2)}
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
        `}switchReportTab(e){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),event.target.classList.add("active"),console.log(`Switching to ${e} reports`)}loadMoreReports(){console.log("Loading more reports...")}generateEmailList(){return[{from:"Lead Response System",subject:"URGENT: 3 Property Owners Responded",time:"8 min ago",priority:"high",preview:"Multiple responses to Dallas County mailer campaign..."},{from:"County Records Alert",subject:"New Foreclosure Filings - Ellis County",time:"2 hours ago",priority:"high",preview:"12 new pre-foreclosure properties match your criteria..."},{from:"OpenAI Billing",subject:"Usage Alert: 80% of Monthly Limit",time:"4 hours ago",priority:"medium",preview:"Your API usage is approaching the monthly limit..."},{from:"John Martinez",subject:"RE: 456 Pine Street Property Inquiry",time:"6 hours ago",priority:"high",preview:"Yes, I am interested in selling. Can we meet this week?"},{from:"Marketing Campaign",subject:"Weekly Performance Report",time:"Yesterday",priority:"low",preview:"Facebook campaigns generated 23 leads this week..."}].map(t=>{const a={high:"#ff4444",medium:"#ffd700",low:"#32cd32"}[t.priority];return`
                <div style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; transition: background 0.2s;" 
                     onmouseover="this.style.background='rgba(255, 255, 255, 0.05)'" 
                     onmouseout="this.style.background='transparent'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${t.from}</div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${t.time}</div>
                            <div style="width: 6px; height: 6px; background: ${a}; border-radius: 50%; margin-left: auto; margin-top: 4px;"></div>
                        </div>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; margin-bottom: 4px; font-weight: 500;">${t.subject}</div>
                    <div style="color: var(--lodge-text-secondary); font-size: 12px; line-height: 1.3;">${t.preview}</div>
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
        `}generateWeekPreview(){return[{day:"Tue",count:2,highlight:"Contract Review Meeting"},{day:"Wed",count:4,highlight:"3 Property Showings"},{day:"Thu",count:1,highlight:"Ironman Training Block"},{day:"Fri",count:3,highlight:"Team Performance Review"},{day:"Sat",count:1,highlight:"Long Training Session"}].map((t,a)=>`
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${t.day}</div>
                        <div style="color: var(--lodge-text-secondary); font-size: 12px;">${t.highlight}</div>
                    </div>
                    <div style="background: var(--lodge-accent); color: white; padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: 600;">
                        ${t.count}
                    </div>
                </div>
            </div>
        `).join("")}generateWeeklyPlan(){return[{day:"Mon",workout:"Swimming - Base",status:"complete",duration:"45 min"},{day:"Tue",workout:"Running - Intervals",status:"scheduled",duration:"60 min"},{day:"Wed",workout:"Cycling - Endurance",status:"scheduled",duration:"90 min"},{day:"Thu",workout:"Swimming - Speed",status:"scheduled",duration:"45 min"},{day:"Fri",workout:"Brick Training",status:"scheduled",duration:"75 min"},{day:"Sat",workout:"Long Run",status:"scheduled",duration:"120 min"},{day:"Sun",workout:"Recovery/Yoga",status:"scheduled",duration:"30 min"}].map((t,a)=>{const o=t.status==="complete"?"#32cd32":t.status==="scheduled"?"#ffd700":"#888";return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${t.day}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 12px;">${t.workout} • ${t.duration}</div>
                        </div>
                        <div style="background: ${o}; color: white; padding: 3px 8px; border-radius: 8px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                            ${t.status}
                        </div>
                    </div>
                </div>
            `}).join("")}generateRecentWorkouts(){return[{date:"Today",type:"Swimming",distance:"2000m",time:"31:45",hr:"142 avg",quality:"excellent"},{date:"Yesterday",type:"Running",distance:"8.2 km",time:"42:15",hr:"156 avg",quality:"good"},{date:"Feb 14",type:"Cycling",distance:"45 km",time:"1:38:22",hr:"148 avg",quality:"good"},{date:"Feb 13",type:"Swimming",distance:"1500m",time:"24:30",hr:"138 avg",quality:"excellent"}].map((t,a)=>{const o={excellent:"#32cd32",good:"#ffd700",fair:"#ff8c00",poor:"#ff4444"}[t.quality];return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <div>
                            <div style="color: var(--lodge-light); font-weight: 600; font-size: 14px;">${t.type}</div>
                            <div style="color: var(--lodge-text-secondary); font-size: 11px;">${t.date}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--lodge-light); font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                                ${t.distance} • ${t.time}
                            </div>
                            <div style="color: ${o}; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                                ${t.quality}
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
        `}setupPanelInteractions(e){e==="desk"&&(window.lodgeUI.expandProject=t=>{const a=document.getElementById("wholesaling-kanban");a&&(a.style.display=a.style.display==="none"?"block":"none")}),window.lodgeUI.startWorkout=()=>{alert("Starting workout timer! (Would integrate with fitness app/tracker)")},window.lodgeUI.logWorkout=()=>{alert("Workout logged! (Would save to training database)")}}generateBudgetTracking(){return[{category:"AI/Software",budgeted:200,actual:170,color:"#32cd32"},{category:"Marketing",budgeted:150,actual:65,color:"#32cd32"},{category:"Infrastructure",budgeted:75,actual:50,color:"#32cd32"},{category:"Training/Health",budgeted:100,actual:125,color:"#ff8c00"},{category:"Misc/Other",budgeted:50,actual:35,color:"#32cd32"}].map(t=>{const a=t.actual/t.budgeted*100,o=a>100?"#ff6b35":a>80?"#ff8c00":"#32cd32";return`
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="color: var(--lodge-light); font-size: 14px; font-weight: 500;">${t.category}</span>
                        <span style="color: ${o}; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">
                            $${t.actual} / $${t.budgeted}
                        </span>
                    </div>
                    <div style="width: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 8px; height: 6px;">
                        <div style="width: ${Math.min(a,100)}%; background: ${o}; height: 100%; border-radius: 8px; transition: width 0.3s ease;"></div>
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
        `}generateMonitoringFeed(){return[{time:"30s ago",type:"success",message:"Lead processing batch completed: 47 new prospects analyzed",source:"Scout"},{time:"2m ago",type:"warning",message:"Email delivery rate dropped to 87% (threshold: 90%)",source:"Marketing"},{time:"5m ago",type:"info",message:"Database optimization completed: 23% performance improvement",source:"Builder"},{time:"8m ago",type:"success",message:"Tim completed 3 seller calls - 2 appointments scheduled",source:"CRM"},{time:"12m ago",type:"warning",message:"API rate limit approaching: 89% of hourly limit",source:"System"}].map((t,a)=>{const o={success:"#32cd32",warning:"#ff8c00",error:"#ff4444",info:"#00ced1"}[t.type];return`
                <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${a%2===0?"background: rgba(255, 255, 255, 0.02);":""}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 6px; height: 6px; background: ${o}; border-radius: 50%;"></div>
                            <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${t.source}</span>
                        </div>
                        <span style="color: var(--lodge-text-secondary); font-size: 11px; font-family: 'JetBrains Mono', monospace;">${t.time}</span>
                    </div>
                    <div style="color: var(--lodge-light); font-size: 13px; line-height: 1.4; margin-left: 14px;">
                        ${t.message}
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
        `}}const y=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||"ontouchstart"in window||navigator.maxTouchPoints>0,z={type:d.AUTO,width:1200,height:800,parent:"game-container",backgroundColor:"#0a1f0a",physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scale:{mode:d.Scale.FIT,autoCenter:d.Scale.CENTER_BOTH,min:{width:800,height:600},max:{width:1600,height:1200}},scene:w},M=new d.Game(z),C=new k(y);window.lodgeGame=M;window.lodgeUI=C;window.isMobile=y;y&&(document.getElementById("mobile-controls").style.display="block");console.log("🏕️ The Lodge initialized successfully!");
