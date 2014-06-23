/**
* jquery-jcflick.js
* マルチデバイス対応(メディアクエリー対応)
* PC, iOS, Android
* 
* @version 0.0.1
* @Author: hiroki ooiwa;
*/
(function($) {

	$.fn.slideEffect = function(callback) {
		var $element = $(this);
		var gWait = 0;
		$element.children().css({visibility: 'hidden'});
		
		var to = function(){
			var f = Array.prototype.shift.apply(arguments);
			args = arguments;
			return setTimeout(function() { f.apply(null, args) }, gWait);
		}
		var transform = function(){
			var i = 0, L = $element.children().length;
			to(function f(fin){
				if( !$element.children().eq(i).attr('wait') ){
					gWait = 500;
				}
				else{
					gWait = parseInt( $element.children().eq(i).attr('wait') );
				}
				if (!(i < L)){
					return fin();
				}
				//============================================================
				// 表示重ね位置の調整
				//
				if( $element.children().eq(i).attr('zindex') ){
					$element.children().eq(i).css({
						zIndex: $element.children().eq(i).attr('zindex')
					});
				}
				
				//============================================================
				// エフェクト処理一覧
				//
				// fadeIn
				// moveRightIn
				// moveLeftIn
				// moveTopIn
				// moveBottomIn
				// changeImage
				//
				
				//------------------------------------------------------------
				// エフェクト設定
				//
				
				//default
				var effect_type = $element.children().eq(i).attr('effect'),
					timer = parseInt($element.children().eq(i).attr('timer')),
					move_position = 40,
					move_speed = 1000,
					posAfter,
					posBefore
				;
				
				//custom
				if( $element.children().eq(i).attr('speed') ){
					move_speed = parseInt( $element.children().eq(i).attr('speed') );
				}
				
				//IE判別
				var isMSIE = /*@cc_on!@*/false;
				
				//------------------------------------------------------------
				// fadeIn
				//
				// ex:
				// <div class="absolute" top="0" left="0" effect="fadeIn"><img src="xxx.png" alt=""></div>
				//
				if( effect_type === 'fadeIn' ){
					$element.children().eq(i)
					.css({ visibility: 'visible', left: $element.children().eq(i).attr('left') + 'px', top: $element.children().eq(i).attr('top') + 'px' })
					.hide().fadeIn();
				}
				
				//------------------------------------------------------------
				// moveRightIn
				//
				// ex:
				// <div class="absolute" top="0" left="0" effect="moveRightIn"><img src="xxx.png" alt=""></div>
				//
				if( effect_type.match(/moveRightIn/) ){
					posAfter = parseInt( $element.children().eq(i).attr('left') );
					posBefore = posAfter + move_position;
					
					if( isMSIE ){
						$element.children().eq(i)
							.css({ left: posBefore + 'px', top: $element.children().eq(i).attr('top') + 'px', visibility: 'visible' })
							.animate({ left: posAfter + 'px' }, move_speed)
						;
					}
					else{
						$element.children().eq(i)
							.css({ left: posBefore + 'px', top: $element.children().eq(i).attr('top') + 'px', opacity: 0, visibility: 'visible' })
							.animate({ left: posAfter + 'px', opacity: 1 }, move_speed)
						;
					}
				}
				
				//------------------------------------------------------------
				// moveLeftIn
				//
				// ex:
				// <div class="absolute" top="0" left="0" effect="moveLeftIn"><img src="xxx.png" alt=""></div>
				//
				if( effect_type.match(/moveLeftIn/) ){
					posAfter = parseInt( $element.children().eq(i).attr('left') );
					posBefore = posAfter - move_position;
					
					if( isMSIE ){
						$element.children().eq(i)
							.css({ left: posBefore + 'px', top: $element.children().eq(i).attr('top') + 'px', visibility: 'visible' })
							.animate({ left: posAfter + 'px' }, move_speed)
						;
					}
					else{
						$element.children().eq(i)
							.css({ left: posBefore + 'px', top: $element.children().eq(i).attr('top') + 'px', opacity: 0, visibility: 'visible' })
							.animate({ left: posAfter + 'px', opacity: 1 }, move_speed)
						;
					}
				}
				
				//------------------------------------------------------------
				// moveTopIn
				//
				// ex:
				// <div class="absolute" top="0" left="0" effect="moveTopIn"><img src="xxx.png" alt=""></div>
				//
				if( effect_type.match(/moveTopIn/) ){
					posAfter = parseInt( $element.children().eq(i).attr('top') );
					posBefore = posAfter - move_position;
					
					if( isMSIE ){
						$element.children().eq(i)
							.css({ top: posBefore + 'px', left: $element.children().eq(i).attr('left') + 'px', visibility: 'visible' })
							.animate({ top: posAfter + 'px' }, move_speed)
						;
					}
					else {
						$element.children().eq(i)
							.css({ top: posBefore + 'px', left: $element.children().eq(i).attr('left') + 'px', opacity: 0, visibility: 'visible' })
							.animate({ top: posAfter + 'px', opacity: 1 }, move_speed)
						;
					}
				}
				
				//------------------------------------------------------------
				// moveBottomIn
				//
				// ex:
				// <div class="absolute" top="0" left="0" effect="moveBottomIn" start="598"><img src="xxx.png" alt=""></div>
				//
				if( effect_type.match(/moveBottomIn/) ){
					posAfter = parseInt( $element.children().eq(i).attr('top') );
					posBefore = ( $element.children().eq(i).attr('start') )? parseInt( $element.children().eq(i).attr('start') ) : posAfter + move_position;
					
					if( isMSIE ){
						$element.children().eq(i)
							.css({ top: posBefore + 'px', left: $element.children().eq(i).attr('left') + 'px', visibility: 'visible' })
							.animate({ top: posAfter + 'px' }, move_speed)
						;
					}
					else{
						$element.children().eq(i)
							.css({ top: posBefore + 'px', left: $element.children().eq(i).attr('left') + 'px', opacity: 0, visibility: 'visible' })
							.animate({ top: posAfter + 'px', opacity: 1 }, move_speed)
						;
					}
				}
				
				//------------------------------------------------------------
				// changeImage
				//
				// ex:
				// <ul class="absolute" top="0" left="0" effect="changeImage">
				//     <li><img src="xxx1.png" alt=""></li>
				//     <li><img src="xxx2.png" alt=""></li>
				// </ul>
				//
				if( effect_type.match(/changeImage/) ){
					var pos = 0;
					var elm = $element.children().eq(i),
						li = $( 'li', $element.children()[i] ),
						setTimer
					;
					var changeCol = function(num){
						for( var j = 0, L = li.length; j < L; j++ ){
							$(li[j]).hide();
						}
						$(li[num]).show();
						var speed = ( $(li[num]).attr('speed') )? parseInt( $(li[num]).attr('speed') ): 500;
						elm.hide().fadeIn(speed);
					}
					changeCol(pos);
					elm.css({ visibility: 'visible', top: $element.children().eq(i).attr('top') + 'px', left: $element.children().eq(i).attr('left') + 'px' });
					
					var speed = ( elm.attr('speed') )? parseInt( elm.attr('speed') ): 4000;
					setTimer = setInterval(function(){
						if( 0 <= pos && pos < li.length - 1 ){
							pos += 1;
							changeCol(pos);
						}
						else {
							pos = 0;
							changeCol(pos);
						}
						
					}, speed);
					
					function changeClear(){
						clearInterval(setTimer);
					}
					if( document.getElementById('btnBack') || document.getElementById('btnNext') ){
						$('#btnBack').bind('click', changeClear);
						$('#btnNext').bind('click', changeClear);
					}
				}
				
				//------------------------------------------------------------
				i++;
				to(f, fin);
			}, function(){
				//------------------------------------------------------------
				// コールバック関数
				//
				if( typeof(callback) !== 'undefined' ){
					callback();
				}
				
				//------------------------------------------------------------
			});
		}
		transform();
	}
})(jQuery);