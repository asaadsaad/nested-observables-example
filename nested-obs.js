const { of } = require('rxjs');
const { map, mergeAll, flatMap } = require('rxjs/operators');

function getParams() {
    return of({ user_id: 5 })
}

function getUserDetails(user_id) {
    return of({ id: user_id, name: 'Asaad' })
}
// double subscriptions
getParams().subscribe(params => {
    getUserDetails(params.user_id).subscribe(console.log)
})

// return obs
getParams()
    .pipe(
        map(params => getUserDetails(params.user_id))
    )
    .subscribe(console.log)

// two subs
getParams()
    .pipe(
        map(params => getUserDetails(params.user_id))
    )
    .subscribe(results => results.subscribe(console.log))

// mergeAll
getParams()
    .pipe(
        map(params => getUserDetails(params.user_id)),
        mergeAll()
    )
    .subscribe(console.log)

// flatMap
getParams()
    .pipe(
        flatMap(params => getUserDetails(params.user_id))
    )
    .subscribe(console.log)