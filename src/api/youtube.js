import axios from 'axios'

const KEY = 'AIzaSyA-SpXcLcyNX2E4ERG4_ehBnt_l4ZweyJY';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        type: 'video',
        maxResults: 1,
        key: KEY
    }
})