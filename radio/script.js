var data = [
{url:'http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk',
logo:'../images/bbc.jpg',
name:'BBC World Service'},
{url:'http://listen.onmyradio.net:8002/;',
logo:'../images/jazzfm.jpg',
name:'Jazz FM'},
{url:'http://media-ice.musicradio.com:80/ClassicFMMP3',
logo:'../images/classicfm.gif',
name:'Classic FM'},
{url:'http://newyorkcity.radiostreamlive.com:8014/radionylive_128',
logo:'../images/ny.jpg',
name:'Radio New Yok'},
{url:'http://91.121.62.121:8080/;',
logo:'../images/junior.jpg',
name:'Junior Radio'},
{url:'http://streaming.hotmix-radio.net/hotmixradio-dance-128.mp3',
logo:'../images/hotmix.jpg',
name:'Hotmix Dance'},
];
document.addEventListener('DOMContentLoaded',doFirst,false);
function doFirst () {
	audioplayer = document.getElementById('audioplayer');
	btnPlay = document.getElementById('btnPlay');
	rsName = document.getElementById('channelName');
	btnPlay.onclick = function () {
		console.log("btnPlay is clicked!");
		btnPlayClick();
	}
	listChannels = document.getElementById('listChannels');
	for(var i=0;i<data.length;i++){
		var rsData = new RadioStream(data[i]);
		var rsDOM = rsData.createDOMElement();
		listChannels.appendChild(rsDOM);
		if(i==0){
			rsDOM.querySelector('img').click();
		}
	}

}

function RadioStream (rs) {
	this.url = rs.url;
	this.logo=rs.logo;
	this.name = rs.name;
}

RadioStream.prototype.createDOMElement = function() {
	var that = this;
	var col = document.createElement('div'),
	thumbnail = document.createElement('div'),
	logo = document.createElement('img'),
	caption = document.createElement('div'),
	name = document.createElement('h3');
	col.setAttribute('class','col-sm-6 col-md-4');
	thumbnail.setAttribute('class','thumbnail');
	logo.setAttribute('class','thumb-image grow-rotate box-shadow-outset');
	logo.src=this.logo;
	logo.onclick= function () {
		selectStream(that.url,that.name);
	}; 
	caption.setAttribute('class','caption');
	name.innerHTML=that.name;
	caption.appendChild(name);
	thumbnail.appendChild(logo);
	thumbnail.appendChild(caption);
	col.appendChild(thumbnail);
	// col.addEventListener('click',selectStream(that.url,that.name),false);
	return col;
};

function btnPlayClick () {
	if(audioplayer.paused){
		console.log('Going to play');
		btnPlay.src='stop.png';
		audioplayer.play();
	}else{
		console.log('Going to stop');
		btnPlay.src='play.png';
		audioplayer.pause();
	}
}

function selectStream (urlStream,nameStream) {
	audioplayer.src=urlStream;
	rsName.innerHTML=nameStream;
}
