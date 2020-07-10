import axios from 'axios'

// constant
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

// types
const GET_RECIPIES = 'GET_RECIPIES'

// reducer