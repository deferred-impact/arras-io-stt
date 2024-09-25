# arras.io STT

Say what you want, you gotta admit this is awesome.

These two small scripts let you use a microphone for chatting in arras.io and scenexe2.io. It's not perfect, but it works.

scenexe2.io support is minimal and only provided as an example. Because that game is such a laggy piece of shit, i will not waste my time on improving it. Additionally, scenexe2.io devs are clearly trying very hard to fight bots, so i fully expect them to patch their game to prevent this code from working soon. Long story short, if you are a scenexe2.io player, you're on your own with this.

## How to?

I run this on Linux. If you're on Windows, uh, my condolences. It might work?

First, install the tampermonkey.js script into the Tampermonkey extension. This will be the receiving end of the system, receiving transcribed text over websocket and using the arras.io chat box to say them.

Install Python dependencies. `pip3 install openai-whisper` and then whatever else it demands from you when you run `livewhisper.py`.

Once you have all the dependencies, run `livewhisper.py`, *then* refresh arras.io tab so that the Tampermonkey script connects to it. This Python script records audio from your microphone and repeatedly sends it to Whisper, OpenAI's speech recognition system.

## Limitations

You probably will need a quality microphone. I use this thing with a proper $50 mic with a pop filter and a vibration compensating arm, and it works reasonably well. Cheap mics may be too noisy for speech recognition to do its job.

Having the mic too close or the gain too high will actually ruin speech recognition. Which is obvious when you think about it, but keep it in mind. If your audio is clipping, the result will be gibberish.

You will need a powerful GPU to run this. "Powerful" is relative, of course; my GTX 750 Ti is just barely large enough to fit the 1 GB model into its CUDA VRAM. The bigger your GPU, the larger the model you can use, the better the quality. Consider changing the `tiny-en` in the Python script to something larger, if your GPU can fit it. Then again, larger models are slower, so perhaps it wouldn't be worth it. It's not like i can test it, my GPU only runs the `tiny-en`.

## Is this cheating? Is this bad?

To an extent, i suppose it is cheating. I think it's not a big deal, though. It doesn't grant a *massive* advantage like an aimbot would. And though the techniques used in this script could be used for something more nefarious, ultimately it doesn't hook into the game internals, so it wouldn't be possible to use as a base for an aimbot or something.

Whatever the case, ultimately this script is *fun*. To me this is the only way to enjoy arras.io. I don't actually find the gameplay particularly good, but talking to people and generally shitposting is fun. And having the ability to speak while moving provides many new opportunities for such shitposting.
