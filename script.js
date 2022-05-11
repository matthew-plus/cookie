const image = document.getElementsByClassName('my-img')[0],
	imgContainer = document.getElementsByClassName('img-container')[0]

let dragImgMouseStart = {},
    lastDiff = {x: 0, y: 0},
    initialPos = image.getBoundingClientRect(),
    currentPos = {x: -initialPos.width/2, y:0};
    imageProperties = {width: null, height: null},
	containerProperties = {width: null, height: null}

let containerStyle = getComputedStyle(imgContainer)

image.onload = function() {
    imageProperties.width = this.width
	imageProperties.height = this.height
	containerProperties.width = parseInt(containerStyle.width)
	containerProperties.height = parseInt(containerStyle.height)

	// Image and Container Properties
    console.log(imageProperties)
    console.log(containerProperties)
}

  function mousedownDragImg(e) {
    e.preventDefault();
    dragImgMouseStart.x = e.clientX;
    dragImgMouseStart.y = e.clientY;
          currentPos.x += lastDiff.x;
          currentPos.y += lastDiff.y;
               lastDiff = {x: 0, y: 0};
    window.addEventListener('mousemove', mousemoveDragImg);
    window.addEventListener('mouseup', mouseupDragImg);
  }

  function mousemoveDragImg(e) {
    e.preventDefault();
    lastDiff.x = e.clientX - dragImgMouseStart.x;
    lastDiff.y = e.clientY - dragImgMouseStart.y;
    requestAnimationFrame(
		function() {
			const newPotions = { width: currentPos.x + lastDiff.x, height: currentPos.y + lastDiff.y }

			// Left Border
            if (newPotions.width > 1) {
                newPotions.width = 0
				currentPos.x = 0
            } 

			// Right Border
            if (newPotions.width < ( containerProperties.width - imageProperties.width )) {
				newPotions.width = containerProperties.width - imageProperties.width
				currentPos.x = containerProperties.width - imageProperties.width
            }

			// Top Border
			if (newPotions.height > 1) {
				newPotions.height = 0
				currentPos.y = 0
			} 

			// Bottom Border
			if (newPotions.height < containerProperties.height - imageProperties.height) {
				newPotions.height = containerProperties.height - imageProperties.height
				currentPos.y = containerProperties.height - imageProperties.height
			} 

            image.style.transform = "translate(" + newPotions.width + "px," + newPotions.height + "px)";
        }
	);
  }

  function mouseupDragImg(e) {
    e.preventDefault();
    // console.log(currentPos.x + lastDiff.x)
   
    window.removeEventListener('mousemove', mousemoveDragImg);
    window.removeEventListener('mouseup', mouseupDragImg);
  }

  image.addEventListener('mousedown', mousedownDragImg);