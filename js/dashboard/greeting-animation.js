// User greeting
let greeted = false;

startAnimation();

/**
 * Once on startup, a animation is shown to greet the user.
 */
function startAnimation() {
    if (!greeted) {
        let animation = document.createElement('div');
        animation.classList.add('greeting-animation', 'title-medium', 'color-primary', 'text-center');
        animation.innerHTML = "Welcome to JOIN";
        document.body.appendChild(animation);
        setTimeout(() => {
            animation.remove();
        }, 2900);
        greeted = true;
    }
}