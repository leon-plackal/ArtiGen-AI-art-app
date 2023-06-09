import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

// get a random prompt from the prompt list
export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    // make sure you dont get the same prompt twice
    if(randomPrompt === prompt){
        getRandomPrompt(prompt)
    }

    return randomPrompt
}

// downlaoding photos
export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
