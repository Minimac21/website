var L = 25;
var C = 5;
var L_c = L-C;
var char = ""
var z1Frames = [];
function line(x, ch){
    var s = ""
    for(var i = 0; i < x;i++){
        s = s.concat(" ");
    }
    for(var i = 0; i < C;i++){
        s = s.concat(ch);
    }
    for(var i = 0;i < L-(C+x);i++){
        s = s.concat(" ");
    }
    return s.concat("\n");
}
function zigline(x){
    if(x <= L_c){
        if(x==(L_c)){
            return line(x, "\\").concat(line(x, "/"));
        } else if(x==0){
            return line(0, "/").concat(line(0,"\\"));
        }
        return line(x, "\\");
    } else {
        return line( -x + 2*L_c ,"/");
    }
}
//iterating through each frame
for(var j = 0; j < 2*L_c; j++){
    var z1Frame = "";
    //iterating through each line of each frame
    for(var i = 0; i < 2*L_c; i++){
        z1Frame = z1Frame.concat(zigline( (i+j) % (2*L_c) ));
    }
    z1Frames.push(z1Frame);
}

var jeffrey = [
"       _ ______ ______ ______ _____  ________     __",
"      | |  ____|  ____|  ____|  __ \\|  ____\\ \\   / /",
"      | | |__  | |__  | |__  | |__) | |__   \\ \\_/ / ",
"  _   | |  __| |  __| |  __| |  _  /|  __|   \\   /  ",
" | |__| | |____| |    | |    | | \\ \\| |____   | |   ",
"  \\____/|______|_|    |_|    |_|  \\_\\______|  |_|   "];
var epstein = [
"  ______ _____   _____ _______ ______ _____ _   _ ",
" |  ____|  __ \\ / ____|__   __|  ____|_   _| \\ | |",
" | |__  | |__) | (___    | |  | |__    | | |  \\| |",
" |  __| |  ___/ \\___ \\   | |  |  __|   | | | . ` |",
" | |____| |     ____) |  | |  | |____ _| |_| |\\  |",
" |______|_|    |_____/   |_|  |______|_____|_| \\_|"
];
var didnt = [
"  _____ _____ _____  _   _ _ _______ ",
" |  __ \\_   _|  __ \\| \\ | ( )__   __|",
" | |  | || | | |  | |  \\| |/   | |   ",
" | |  | || | | |  | | . ` |    | |   ",
" | |__| || |_| |__| | |\\  |    | |   ",
" |_____/_____|_____/|_| \\_|    |_|   "
];
var minecraft = [
"  _  _______ _      _        _    _ _____ __  __  _____ ______ _      ______   ", 
" | |/ /_   _| |    | |      | |  | |_   _|  \\/  |/ ____|  ____| |    |  ____|   ",
" | ' /  | | | |    | |      | |__| | | | | \\  / | (___ | |__  | |    | |__      ",
" |  <   | | | |    | |      |  __  | | | | |\\/| |\\___ \\|  __| | |    |  __|     ",
" | . \\ _| |_| |____| |____  | |  | |_| |_| |  | |____) | |____| |____| |        ",
" |_|\\_\\_____|______|______| |_|  |_|_____|_|  |_|_____/|______|______|_|        "
];
var ILOVEYOU = [
"  _____   _      ______      ________  __     ______  _    _ ",
" |_   _| | |    / __ \\ \\    / /  ____| \\ \\   / / __ \\| |  | |",
"   | |   | |   | |  | \\ \\  / /| |__     \\ \\_/ / |  | | |  | |",
"   | |   | |   | |  | |\\ \\/ / |  __|     \\   /| |  | | |  | |",
"  _| |_  | |___| |__| | \\  /  | |____     | | | |__| | |__| |",
" |_____| |______\\____/   \\/   |______|    |_|  \\____/ \\____/ ",
]




var s = [];
var x = [];
for(var i = 0; i<6; i++){
  x[i] = jeffrey[i] +" "+ epstein[i] +" "+ didnt[i] +" "+ minecraft[i];
}
s=ILOVEYOU
var N = x[0].length;

var border = ""
for(var i = 0; i < N+4; i++){
    border += "="
}
border += "\n"
var jeffFrames = []
//Frames
for(var f = 0; f<N; f++){
    frame = "<pre>" + border
    //Rows
    for(var r=0; r<6; r++){
        frame += "| " + s[r].substring(f,N)
        frame += s[r].substring(0,f)
        frame += " |\n"
    }
    frame += "</pre>" + border
    jeffFrames[f] = frame
}


var danceFrames = [".(^-^)'","-(^-^)-","'(^-^).","-(^o^)-",".(^-^)'","-(^-^)-","'(^-^).","-(^-^)-"];
window.onload = init;

function ASCIIAnimation(animArray, start, speed, DOMtarget) {
  var currentFrame = start;
	for(var i = 0; i < animArray.length; i++) {
		animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
		animArray[i] = "<pre>" + animArray[i] + "</pre>";
	}

	DOMtarget.innerHTML = animArray[0];
	currentFrame++;
	this.animation = setInterval(function() {
		DOMtarget.innerHTML = animArray[currentFrame];
		currentFrame++;
		if(currentFrame >= animArray.length) currentFrame = 0;
	}, speed);

	this.getCurrentFrame = function() {
		return currentFrame;
	}
}

ASCIIAnimation.prototype.stopAnimation = function() {
	clearInterval(this.animation);
}

function init(){
    var header = document.createElement("p");
    var content = document.createElement("div");
    var zigzag1 = document.createElement("div");
    var zigzag2 = document.createElement("div");
    var dance = document.createElement("div");
    document.body.appendChild(header);
    document.body.appendChild(content);
    document.body.style.backgroundColor = "#ccffff";
    content.appendChild(zigzag1);
    content.appendChild(dance);
    content.appendChild(zigzag2);
    header.style.color = '#660066';
    header.style.textAlign = 'center';
    header.style.overflow = 'hidden';
    header.style.fontSize = '0.71vw';
    content.style.display = 'flex';
    content.style.alignItems = 'flex-start';
    content.style.justifyContent = 'space-between';
    dance.style.padding = "100px 0";
    var zigzag1Anim = new ASCIIAnimation(z1Frames,0,100,zigzag1);
    var danceAnim = new ASCIIAnimation(danceFrames,0,150,dance);
    var zigzag2Anim = new ASCIIAnimation(z1Frames,L_c,100,zigzag2);
    var jeffAnim = new ASCIIAnimation(jeffFrames,0,100,header)
}
