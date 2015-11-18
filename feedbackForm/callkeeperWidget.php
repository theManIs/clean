<?php header('Access-Control-Allow-Origin: *');
echo '
<div class="displayInlineBlock redactForm" id="parentFrame">
	<div class="callkeeperMain mainWorkFrame displayInlineBlock" 
		dndattribute="dragable" id="myBestWidget">
		<header>
			<h3 name="myBestWidget" id="callkeeperTitleForm"  
			class="headerHtml valueTitle">Отправить сообщение</h3>
			<div id="callkeeperSecondMessage" class="textAreaShortPost"
			>Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время</div>
		</header>
		<section>
			<div class="callkeeper container input newFieldForm">
				<input type="text" id="specialField" placeholder="Введите ваше имя" 
					class="class InputText newFieldForm">
			</div>
			<div class="callkeeper container input newFieldForm">
				<select class="classSelectPoint newFieldForm" id="specialSelect"></select>
			</div>
			<textarea type="text" id="youQuestion" class="textA blockS"
				placeholder="Введите ваш вопрос"></textarea>
			<button id="youSend" class="callK anyB">Отправить</button>
			<button id="youClose" class="callK anyB closeB featuresS">Закрыть</button>
		</section>
	</div>
</div
><div class="displayInlineBlock">	
	<button id="youPush" class="callK anyB pushD ButtonS">Оставить данные</button>
</div
><div class="containerBillboard displayInlineBlock">
	<div class="callkeeperBillboard">
		<h2 class="callkeeperS messageS" id="titleForComplete">Сообщение</h2>
		<p class="callkeeperS messageBody" id="callMesBody"
			>Вы успешно отправили свои контактные данные</p>
	</div>
</div>
';
?>