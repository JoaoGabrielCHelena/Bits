var cards = document.querySelectorAll('.card')


cards.forEach((element) => {
    /* V this is for skipping the animation at the start */
    let setDuration = window.getComputedStyle(element).getPropertyValue('--animationDuration')
    element.style.setProperty('--animationDuration', `0ms`)
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            element.style.setProperty('--animationDuration', setDuration)
        }, parseInt(setDuration))
    })

    element.addEventListener('mouseenter', function(event) {
        element.addEventListener('mousemove', (event) => calculateDistance(event, element))
    })
    
    element.addEventListener('mouseleave', function(event) {
        element.removeEventListener('mousemove', calculateDistance)
    })  
})

function calculateDistance(event, element) {
    let rect = element.getBoundingClientRect(),
    baseSwivelValue = parseInt(getComputedStyle(element).getPropertyValue("--maxSwivel")),
    maxSwivel = baseSwivelValue ? baseSwivelValue : 25 ,
    height = rect.height,
    width = rect.width,
    centerX = rect.left + width / 2,
    centerY = rect.top + height / 2,
    swivelMultiplierY = maxSwivel / (height / 2),
    swivelMultiplierX = maxSwivel / (width / 2),
    mouseX = event.clientX,
    mouseY = event.clientY,
    distanceX = mouseX - centerX,
    distanceY = mouseY - centerY

    // a distance value between -1 and 1
    let normalizedDistanceY = (distanceY / (height / 2)),
    normalizedDistanceX = (distanceX / (height / 2))

    // used to set the opacity of the colors of the linear gradient of the shine/shadow 
    let absoluteY = -0.3 * normalizedDistanceY

    // shadowY is made like so because the shadow goes further down than up
    let shadowX = 25 * normalizedDistanceX,
    shadowY = normalizedDistanceY < 0 ? -20 * normalizedDistanceY : -5 * normalizedDistanceY
    
    // this is used to invert the layer that acts as the shine/shadow on top of the card
    // this has to be done because it is a linear gradient that is shadow on one side and glow on the other
    let binaryY = distanceY < 0 - height / 6 ? 1 : -1


    // seting all the styles
    element.style.setProperty('--swivelY', `${swivelMultiplierY * distanceY}deg`)
    element.style.setProperty('--swivelX', `${swivelMultiplierX * distanceX}deg`)
    element.style.setProperty('--absoluteY', absoluteY)
    element.style.setProperty('--binaryY', binaryY)
    element.style.setProperty('--shadowX', `${shadowX}px`)
    element.style.setProperty('--shadowY', `${shadowY}px`)
}