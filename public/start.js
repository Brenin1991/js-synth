const buffer1 = new Tone.Buffer("http://localhost:8000/public/kick.wav")
const buffer2 = new Tone.Buffer("http://localhost:8000/public/snare.wav")
const buffer3 = new Tone.Buffer("http://localhost:8000/public/hihat.wav")

const synth = new Tone.PolySynth().toDestination();

const kick = new Tone.Player(buffer1).toDestination();
const snare = new Tone.Player(buffer2).toDestination();
const hihat = new Tone.Player(buffer3).toDestination();

const chorus = new Tone.Chorus().toDestination().start();

const phaser = new Tone.Phaser().toDestination();
const tremolo = new Tone.Tremolo().toDestination().start();
const crusher = new Tone.BitCrusher(4).toDestination();
const pingPong = new Tone.PingPongDelay().toDestination();
const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
const autoPanner = new Tone.AutoPanner("4n").toDestination().start();
const feedbackDelay = new Tone.FeedbackDelay().toDestination();  
const reverb = new Tone.JCReverb().toDestination();  
const filter = new Tone.Filter(440, "lowpass",-12);
const eq = new Tone.EQ3();
const reverb2 = new Tone.Reverb().toDestination(); 
const freeverb = new Tone.Freeverb().toMaster(); 

Sampler = new Tone.Sampler({
    urls: {
        G3: "st6_3.mp3",
        A3: "st6_5.mp3",
        B3: "st5_2.mp3",
        D4: "st5_5.mp3",
        E4: "st4_2.mp3",
        G4: "st4_5.mp3",
        A4: "st3_2.mp3",
        B4: "st3_4.mp3",
        D5: "st2_3.mp3",
        E5: "st2_5.mp3",
        G5: "st1_3.mp3",
        A5: "st1_5.mp3"
    },
    release: 1,
    baseUrl: "https://assets.codepen.io/81395/"
    }).toDestination();

var octave = 3;

//synth.connect(chorus);
//synth.connect(phaser);

synth.connect(filter);
filter.toMaster();


//synth.connect(crusher);
/*

reverb2.set({
    decay : 1.5 ,
    preDelay : 0.01
});

freeverb.set({
    roomSize : 0.7 ,
    dampening : 3000
})
feedbackDelay.set( {
    delayTime : 0.25 ,
    maxDelay : 1
})
pingPong.set( {
    delayTime : 0.25 ,
    maxDelayTime : 1
})
*/

//synth.connect(autoWah);
//synth.connect(autoPanner);
//synth.connect(feedbackDelay);

//synth.connect(feedbackDelay);
//synth.connect(pingPong);
//synth.connect(filter);
//synth.connect(eq);


const now = Tone.now()

let arrayKick = [];

let arraySnare = [];

let arrayHihat = [];

let seqLights = [];

let isPlay = false;

let seq1;

let bpm = 120;

seqLights = document.querySelectorAll('[name=check]');
console.log(seqLights)

playKeyboard();

var data = ['C','D','E','F','G','A','B'];
var html = '';

  
for (var octave = 1; octave < 3; octave++)
{
 for (var i = 0; i < data.length; i++)
  {
    var note = data[i];
    var hasSharp = (['E','B'].indexOf(note) == -1);

html += `<div class='whitenote' onmousedown='noteDown(this, false)' onmouseup='noteUp(this,false)' onmouseleave='noteUp(this,false)' data-note='${note + (octave+4)}'>`;

    if (hasSharp) {
      html += `<div class='blacknote' onmousedown='noteDown(this, true)' onmouseup='noteUp(this, true)' onmouseleave='noteUp(this,true)' data-note='${note + '#' + (octave+4)}'>
           
      </div>`;
    }

    html += `</div>`; 
   }
}

document.getElementById('piano_container').innerHTML = html;

function noteUp(elem, isSharp) { 
 elem.style.background = isSharp ? '#777' : '';
}

function noteDown(elem, isSharp) {
 var note = elem.dataset.note;

 elem.style.background = isSharp ? 'black' : '#ccc';
 synth.triggerAttackRelease(note, "16n");
 console.log(note);
 event.stopPropagation();
}

function playKeyboard(){
    var allowed = true;

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 81) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`C${octave}`, "8n");
        }
        if(event.keyCode == 87) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`D${octave}`, "8n");
        }
        if(event.keyCode == 69) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`E${octave}`, "8n");
        }
        if(event.keyCode == 82) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`F${octave}`, "8n");
        }
        if(event.keyCode == 84) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`G${octave}`, "8n");
        }
        if(event.keyCode == 89) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`A${octave}`, "8n");
        }
        if(event.keyCode == 85) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`B${octave}`, "8n");
        }

        if(event.keyCode == 50) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`C#${octave}`, "8n");
        }
        if(event.keyCode == 51) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`D#${octave}`, "8n");
        }
        
        if(event.keyCode == 53) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`F#${octave}`, "8n");
        }
        if(event.keyCode == 54) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`G#${octave}`, "8n");
        }
        if(event.keyCode == 55) {
            if (event.repeat != undefined) {
                allowed = !event.repeat;
            } if (!allowed) return;
                allowed = false;
                synth.triggerAttackRelease(`A#${octave}`, "8n");
        }
    });


   
      
    
}
function updatePads(){
    arrayKick.length = 0;
    arraySnare.length = 0;
    arrayHihat.length = 0;
    const kickPatern = document.querySelectorAll('[name=check_kick]:checked');
    console.log(kickPatern)
    const snarePatern = document.querySelectorAll('[name=check_snare]:checked');
    console.log(snarePatern)
    const hihatPatern = document.querySelectorAll('[name=check_hh]:checked');
    console.log(hihatPatern)

    for(let i = 0; i < kickPatern.length; i++){
        if(kickPatern[i]){
            arrayKick.push(parseInt(kickPatern[i].value))
            console.log('deu certo')
            console.log(arrayKick)
        }
    }

    for(let i = 0; i < snarePatern.length; i++){
        if(snarePatern[i]){
            arraySnare.push(parseInt(snarePatern[i].value))
            console.log('deu certo')
            console.log(arraySnare)
        }
    }

    for(let i = 0; i < hihatPatern.length; i++){
        if(hihatPatern[i]){
            arrayHihat.push(parseInt(hihatPatern[i].value))
            console.log('deu certo')
            console.log(arrayHihat)
        }
    }

}

function changeBPM(){
    bpm = document.getElementById('bpm-field').value
    console.log(bpm)
    Tone.Transport.bpm.value = bpm * 2;
}

function go(){
    if(isPlay){
        //isPlay == false
        seq1.stop();
    }
    isPlay = true
        Tone.context.latencyHint = 0.3;
    
    //synth.triggerAttackRelease(["A4", "C#4", "E4"], 1);
    //synth.triggerAttackRelease(["B4", "D4", "F#4"], 4);
    //

    
    
    seq1 = new Tone.Sequence(function(time, idx){
        
        if(arrayKick.indexOf(idx) >= 0){
            kick.start(); 
        }
        if(arraySnare.indexOf(idx) >= 0){
            snare.start(); 
        }

        if(arrayHihat.indexOf(idx) >= 0){
            hihat.start(); 
        }
        if(parseInt(seqLights[idx].value) == idx){
            for(let i = 0 ; i< seqLights.length;i++){
                seqLights[i].style.background = '#292A2C'
                seqLights[i].style.boxShadow = "0 0 7px #caffff,0 0 10px #b2ffff,0 0 21px #97ffff,0 0 42px #00ffff"
            }
            seqLights[idx].style.background = "#00ffff"
            seqLights[i].style.boxShadow = "0 0 7px #caffff,0 0 10px #b2ffff,0 0 21px #97ffff,0 0 42px #00ffff"
            
        } 

    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

   

    Tone.Transport.start('+0.5');
    seq1.start();
}

function changeAtk(vol) {	
    document.querySelector('#attack').value = vol + "ms";
    synth.set({
        "envelope" : {
            "attack" : vol
        }
    });
}

function changeDec(vol) {	
    document.querySelector('#decay').value = vol + "ms";
    synth.set({
        "envelope" : {
            "decay" : vol
        }
    });
}

function changeSus(vol) {	
    document.querySelector('#sustain').value = vol;
    synth.set({
        "envelope" : {
            "sustain" : vol
        }
    });
}

function changeRel(vol) {	
    document.querySelector('#release').value = vol + "ms";
    synth.set({
        "envelope" : {
            "release" : vol
        }
    });
}

function changeVoices(vol) {	
    document.querySelector('#voices').value = vol;
    synth.set({ polyphony: vol });
    synth.set({ voice : vol });
}

function changeDetune(vol) {	
    document.querySelector('#detune').value = vol;
    synth.set({ detune: vol });
}

function changeVolume(vol) {	
    document.querySelector('#volume').value = vol + "db";
    synth.set({ volume: vol });
}

function changeOscillatorType(vol) {	
    if(vol == 1){
        document.querySelector('#oscillatorType').value = "Sine Wave";
        synth.set({
            "oscillator" : {
                "type" : "sine"
            }
        });
    }

    if(vol == 2){
        document.querySelector('#oscillatorType').value = "Sawtooth Wave";
        synth.set({
            "oscillator" : {
                "type" : "sawtooth"
            }
        });
    }

    if(vol == 3){
        document.querySelector('#oscillatorType').value = "Square Wave";
        synth.set({
            "oscillator" : {
                "type" : "square"
            }
        });
    }

    if(vol == 4){
        document.querySelector('#oscillatorType').value = "Triangle Wave";
        synth.set({
            "oscillator" : {
                "type" : "triangle"
            }
        });
    }
    
}

function changeChorusFrequency(vol) {	
    document.querySelector('#chorus_frequency').value = vol + "hz";
    chorus.set({ frequency: vol });
}

function changeChorusDelayTime(vol) {	
    document.querySelector('#chorus_delay_time').value = vol + "ms";
    chorus.set({ delayTime: vol });
}

function changeChorusDepth(vol) {	
    document.querySelector('#chorus_depth').value = (vol*100) + "%";
    chorus.set({ depth: vol }); 
}

function changeChorusType(vol) {	
    if(vol == 1){
        document.querySelector('#chorus_type').value = "Sine Wave";
        chorus.set({
                "type" : "sine"
            }
        );
    }

    if(vol == 2){
        document.querySelector('#chorus_type').value = "Sawtooth Wave";
        chorus.set({
                "type" : "sawtooth"
            }
        );
    }

    if(vol == 3){
        document.querySelector('#chorus_type').value = "Square Wave";
        chorus.set({
                "type" : "square"
            }
        );
    }

    if(vol == 4){
        document.querySelector('#chorus_type').value = "Triangle Wave";
        chorus.set({
            "type" : "triangle" 
        });
    }
    
}

function changeChorusSpread(vol) {	
    document.querySelector('#chorus_spread').value = vol;
    chorus.set({ spread: vol }); 
}

function chorusCheck() {	
    if(document.getElementById('chorusCheck').checked){
        synth.connect(chorus);
    } else {
        synth.disconnect(chorus);
    }
}

function changePhaserFrequency(vol) {	
    document.querySelector('#phaser_frequency').value = vol + "hz";
    phaser.set({ frequency: vol });
}

function changePhaserOctaves(vol) {	
    document.querySelector('#phaser_octaves').value = vol;
    phaser.set({ octaves: vol });
}

function changePhaserStages(vol) {	
    document.querySelector('#phaser_stages').value = vol;
    phaser.set({ stages: vol });
}

function changePhaserQ(vol) {	
    document.querySelector('#phaser_q').value = vol;
    phaser.set({ Q: vol });
}

function changePhaserFreq(vol) {	
    document.querySelector('#phaser_bfq').value = vol + "hz";
    phaser.set({ baseFrequency: vol });
}

function phaserCheck() {	
    if(document.getElementById('phaserCheck').checked){
        synth.connect(phaser);
    } else {
        synth.disconnect(phaser);
    }
}

function changeTremoloFrequency(vol) {	
    document.querySelector('#tremolo_frequency').value = vol + "hz";
    tremolo.set({ frequency: vol });
}

function changeTremoloDepth(vol) {	
    document.querySelector('#tremolo_depth').value = (vol*100) + "%";
    tremolo.set({ depth: vol }); 
}

function changeTremoloType(vol) {	
    if(vol == 1){
        document.querySelector('#tremolo_type').value = "Sine Wave";
        tremolo.set({
                "type" : "sine"
            }
        );
    }

    if(vol == 2){
        document.querySelector('#tremolo_type').value = "Sawtooth Wave";
        tremolo.set({
                "type" : "sawtooth"
            }
        );
    }

    if(vol == 3){
        document.querySelector('#tremolo_type').value = "Square Wave";
        tremolo.set({
                "type" : "square"
            }
        );
    }

    if(vol == 4){
        document.querySelector('#tremolo_type').value = "Triangle Wave";
        tremolo.set({
            "type" : "triangle" 
        });
    }
    
}

function changeTremoloSpread(vol) {	
    document.querySelector('#tremolo_spread').value = vol;
    tremolo.set({ spread: vol }); 
}

function tremoloCheck() {	
    if(document.getElementById('tremoloCheck').checked){
        synth.connect(tremolo);
    } else {
        synth.disconnect(tremolo);
    }
}

function changeReverbRoomSize(vol) {	
    document.querySelector('#reverb_room_size').value = vol;
    freeverb.set({ roomSize: vol }); 
    
}

function changeReverbDampening(vol) {	
    document.querySelector('#reverb_dampening').value = vol;
    freeverb.set({ dampening: vol }); 
}

function changeReverbDecay(vol) {	
    document.querySelector('#reverb_decay').value = vol;
    reverb2.set({ decay: vol }); 
}

function changeReverbPreDelay(vol) {	
    document.querySelector('#reverb_predelay').value = vol;
    reverb2.set({ preDelay: vol }); 
}

function reverbCheck() {	
    if(document.getElementById('reverbCheck').checked){
        synth.connect(reverb2);
        synth.connect(freeverb);
    } else {
        synth.disconnect(reverb2);
        synth.disconnect(freeverb);
    }
}

function changeFDelayDTime(vol) {	
    document.querySelector('#fdelay_delay_time').value = vol + "ms";
    feedbackDelay.set({ delayTime: vol }); 
}

function changeFDelayMaxDelay(vol) {	
    document.querySelector('#fdelay_max_delay').value = vol;
    feedbackDelay.set({ maxDelay: vol }); 
}

function fDelayCheck() {	
    if(document.getElementById('fDelayCheck').checked){
        synth.connect(feedbackDelay);
    } else {
        synth.disconnect(feedbackDelay);
    }
}

function changePPDelayDTime(vol) {	
    document.querySelector('#ppdelay_delay_time').value = vol + "ms";
    pingPong.set({ delayTime: vol }); 
}

function changePPDelayMaxDelay(vol) {	
    document.querySelector('#ppdelay_max_delay').value = vol + "ms";
    pingPong.set({ maxDelay: vol }); 
}

function ppDelayCheck() {	
    if(document.getElementById('ppDelayCheck').checked){
        synth.connect(pingPong);
    } else {
        synth.disconnect(pingPong);
    }
}

function changeFilterLowPass(vol) {	
    document.querySelector('#filter_lowpass').value = vol + "hz";
    filter.set({
        frequency : vol,
    });
}

function changeOctave(vol){
    document.querySelector('#octave').value = vol;
    octave = vol;
}



