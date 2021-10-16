const toggleSwitch = document.getElementById("toggleSwitch")
const slider = document.getElementById('pwmOutput')

slider.addEventListener("input", (e) => {

    console.log({ pwm_value: +e.target.value })

    try {

        fetch("http://YOUR_LOCAL_IP_ADDRESS:3000/api",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ pwm_value: +e.target.value })
            })
    }
    catch (e) {

        console.log(e)
    }
});

toggleSwitch.addEventListener("change", (e) => {

    console.log({ led_state: e.target.checked })


    try {

        fetch("http://YOUR_LOCAL_IP_ADDRESS:3000/api",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ led_state: e.target.checked })
            })
    }

    catch (e) {

        console.log(e)
    }

});
