// Reference for InputEvent: https://w3c.github.io/input-events/#interface-InputEvent
export const IS_INPUT_SUPPORTED = (function () {
    try {
        // just kill browsers off, that throw an error if they don't know
        // `InputEvent`
        const event = new InputEvent('input', {
            data: 'xyz',
            inputType: 'deleteContentForward'
        })
        let support = false

        // catch the others
        // https://github.com/chromium/chromium/blob/c029168ba251a240b0ec91fa3b4af4214fbbe9ab/third_party/blink/renderer/core/events/input_event.cc#L78-L82
        const el = document.createElement('input')
        el.addEventListener('input', function (e) {
            // @ts-ignore
            if (e.inputType === 'deleteContentForward') {
                support = true
            }
        })

        el.dispatchEvent(event)
        return support
    } catch (error) {
        return false
    }
})()
