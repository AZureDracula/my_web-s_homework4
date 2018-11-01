window.onload = function() {
				var wrap = document.getElementById('wrap');
				var pic = document.getElementById('pic');
				var Li = document.getElementById('list').getElementsByTagName('li');
				var prev = document.getElementById('Prev');
				var next = document.getElementById('Next');
				var animated = false;
				var index = 0;
				var timer = null;
				next.onclick = function() {
					if(animated) { //如果图片正在滚动时要返回，否则index会变化
						return;
					} else {
						index++;
						if(index >= Li.length) {
							index = 0;
						}
					}

					showlist();
					if(animated == false) { //if(!animated)
						animate(-600);
					}
				}
				prev.onclick = function() {
					if(animated) {
						return;
					} else {
						index--;
						if(index <= 0) {
							index = Li.length - 1;
						}
					}

					showlist();
					if(!animated) { //判断其是否滚动完
						animate(600);
					}
				}
				for(var i = 0; i < Li.length; i++) {
					Li[i].num = i;
					Li[i].onclick = function() {
						if(this.className == "on") {
							return;
						}
						var offset = -600 * (this.num - index);
						if(!animated) {
							animate(offset);
						}
						index = this.num;
						showlist();
					}
				}
				//图片变换
				function animate(offset) {
					animated = true;
					var newLeft = parseInt(pic.style.left) + offset;
					var time = 300 //位移总时间
					var interval = 10; //位移间隔时间
					var speed = offset / (time / interval); //每次位移量

					function go() {
						if((speed < 0 && parseInt(pic.style.left) > newLeft) || (speed > 0 && parseInt(pic.style.left) < newLeft)) {
							pic.style.left = parseInt(pic.style.left) + speed + 'px';
							setTimeout(go, interval);
						} else {
							animated = false;
							pic.style.left = newLeft + 'px';
							if(newLeft > -600) {
								pic.style.left = -3000 + 'px';
							}
							if(newLeft < -3000) {
								pic.style.left = -600 + 'px';
							}
						}
					}
					go();
				}
				//圆点变换
				function showlist() {
					for(var i = 0; i < Li.length; i++) {
						Li[i].className = "";
					}
					Li[index].className = "on";
				}
				//自动播放
				function play() {
					timer = setInterval(function() {
						next.onclick();
					}, 2000);
				}

				function stop() {
					clearInterval(timer);
				}
				wrap.onmouseover = stop;
				wrap.onmouseout = play;
				play();
			}