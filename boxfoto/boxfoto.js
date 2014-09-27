var photoDOM = '<div class="col-xs-6 col-md-3 col-xs-12"> <a href="#" class="thumbnail"> <img src="" class="photo"> </a> </div>';

function doFirst () {
	navigator.getUserMedia  = navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia;

	video = document.getElementById('myvideo');
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	btnCapture = document.getElementById('btnCapture');
	btnCapture.addEventListener('click',capture,false);
	listPhotos = document.getElementById('list-photos');
	if (navigator.getUserMedia) {
		navigator.getUserMedia({audio: false, video: true}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
		}, errorCallback);
	} else {
		video.src = 'rio2.mp4';
	}
}

function capture () {
	ctx.drawImage(video, 0, 0,640,480);
	var mParser = new DOMParser();
    var htmlTemplateParser = mParser.parseFromString(photoDOM,'text/html');
    var newPhoto = htmlTemplateParser.querySelector('.col-xs-6');
    var photoSrc = canvas.toDataURL('image/webp');
	newPhoto.querySelector('.thumbnail').href = photoSrc;
	newPhoto.querySelector('.thumbnail').setAttribute('download',(new Date()).getTime()+'.webp');
    newPhoto.querySelector('.photo').src = photoSrc;
    listPhotos.appendChild(newPhoto);
}

function errorCallback (e) {
	console.log('Cannot get user media: '+e.name);
}

document.addEventListener('DOMContentLoaded',doFirst,false);