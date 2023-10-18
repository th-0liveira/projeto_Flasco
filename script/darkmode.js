let localDarkMode = localStorage.getItem('darkmode')
let element = document.body;
let _switch = document.getElementById('switchDarkMode');


if (localDarkMode == undefined || localDarkMode == 'light') {
    element.dataset.bsTheme = 'light';                
    localStorage.setItem('darkmode', 'light')
    alteraSwitch(true);
}
else if (localDarkMode == 'dark') {                
    element.dataset.bsTheme = 'dark';
    alteraSwitch(false);
    localStorage.setItem('darkmode', 'dark')
}

_switch.addEventListener('click', () => {

    if (_switch.checked) {            
        element.dataset.bsTheme = 'light';   
        localStorage.setItem('darkmode', 'light')                 
        
    }
    if (!_switch.checked) {                    
        element.dataset.bsTheme = 'dark';                    
        localStorage.setItem('darkmode', 'dark')                                     
    }
})

function alteraSwitch(bool) {
    _switch.checked = bool;
}