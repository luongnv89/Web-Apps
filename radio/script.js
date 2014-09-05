var langs=['English','French','Vietnamese'];
var cats =['News','Music','talk'];
var tag = ['jazz','classic','news'];
var data = [
{
	url:'http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk',
	logo:'images/bbc.jpg',
	name:'BBC World Service',
	language:0,
	category:0,
	tags:[2]},
{
	url:'http://listen.onmyradio.net:8002/;',
	logo:'images/jazzfm.jpg',
	name:'Jazz FM',
	language:0,
	category:1,},
{
	url:'http://media-ice.musicradio.com:80/ClassicFMMP3',
	logo:'images/classicfm.gif',
	name:'Classic FM',
	language:0,
	category:1,},
{
	url:'http://newyorkcity.radiostreamlive.com:8014/radionylive_128',
	logo:'images/ny.jpg',
	name:'Radio New Yok',
	language:0,
	category:0,},
// {
// 	url:'http://91.121.62.121:8080/;',
// 	logo:'images/junior.jpg',
// 	name:'Junior Radio'},
{
	url:'http://streaming.hotmix-radio.net/hotmixradio-dance-128.mp3',
	logo:'images/hotmix.jpg',
	name:'Hotmix Dance',
	language:0,
	category:1,},
// {
// 	url:"http://army.wavestreamer.com:8841/;stream/1",
// 	logo:"images/redstate.jpg",
// 	name:'Red State Talk Radio'},
// {
// 	url:"http://stream.superhumanradio.com:8000/;stream/1",
// 	logo:"images/superHumanRadio.jpg",
// 	name:'Super Human Radio'},
{
	url:"http://stream.rfi.fr/2588/rfi_en_anglais/rfianglais.mp3",
	logo:"images/rfi.gif",
	name:'RFI Anglais',
	language:0,
	category:0,},
{
	url:"http://telechargement.rfi.fr/rfi/francais/audio/last/RFI_24H_en_france_1_1.mp3",
	logo:"images/rfi24.png",
	name:'RFI 24H en France',
	language:1,
	category:0,},
{
	url:"http://telechargement.rfi.fr/rfi/francais/audio/last/rfi_jrn_dernier_journal.mp3",
	logo:"images/rfi.gif",
	name:'Dernier Journal Monde',
	language:1,
	category:0,},
{
	url:"http://mp3.live.tv-radio.com/rfimonde/all/rfimonde-64k.mp3",
	logo:"images/rfi.gif",
	name:'Direct Monde',
	language:1,
	category:0,},
{
	url:"http://mp3.live.tv-radio.com/rfimusiquemonde/all/rfimusiquemonde-64k.mp3",
	logo:"images/rfi.gif",
	name:'Musique',
	language:1,
	category:1,},
{
	url:"http://telechargement.rfi.fr/rfi/francais/audio/last/rfi_jrn_dernier_journal_fr_facile.mp3",
	logo:"images/rfi.gif",
	name:'Dernier Journal en Francais Facile',
	language:1,
	category:0,},

];
document.addEventListener('DOMContentLoaded',doFirst,false);
function doFirst () {
	flashValue = document.getElementById('flash-value');
	audioplayer = document.getElementById('audioplayer');
	btnPlay = document.getElementById('btnPlay');
	rsName = document.getElementById('channelName');
	btnPlay.onclick = function () {
		console.log("btnPlay is clicked!");
		btnPlayClick();
	}
	listEnglish = document.getElementById('listEnglish');
	listFrench = document.getElementById('listFrench');
	listViet = document.getElementById('listViet');
	for(var i=0;i<data.length;i++){
		var rsData = new RadioStream(data[i]);
		var rsDOM = rsData.createDOMElement();
		switch(data[i].language){
			case 0:
			listEnglish.appendChild(rsDOM);
			break;
			case 1:
			listFrench.appendChild(rsDOM);
			break;
			case 2:
			listViet.appendChild(rsDOM);
			break;
		}
	}

}

function RadioStream (rs) {
	this.url = rs.url;
	this.logo=rs.logo;
	this.name = rs.name;
	this.language = langs[rs.language];
	this.category = cats[rs.category];
}

RadioStream.prototype.createDOMElement = function() {
	var that = this;
	var col = document.createElement('div'),
	thumbnail = document.createElement('div'),
	logo = document.createElement('img'),
	caption = document.createElement('div'),
	name = document.createElement('h3'),
	other = document.createElement('div'),
	otherText = document.createElement('h4');
	col.setAttribute('class','col-sm-6 col-md-4');
	thumbnail.setAttribute('class','thumbnail');
	logo.setAttribute('class','thumb-image grow-rotate box-shadow-outset');
	logo.src=this.logo;
	logo.onclick= function () {
			selectStream(that.url,that.name);	
	}; 
	caption.setAttribute('class','caption');
	name.innerHTML=that.name;
	other.setAttribute('class','otherInfo');
	otherText.innerHTML='['+that.category+']';
	caption.appendChild(name);
	other.appendChild(otherText);
	caption.appendChild(other);
	thumbnail.appendChild(logo);
	thumbnail.appendChild(caption);
	col.appendChild(thumbnail);
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
