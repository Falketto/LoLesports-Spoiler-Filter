let winnerTeamOne, winnerTeamTwo, scoreTeamOne, scoreTeamTwo;
let futureObserver = new MutationObserver(hideSpoilers);

chrome.storage.sync.get(['isOn'], data => {
    if (data.isOn == true) {
        new Promise((resolve, reject) => {
            let el = document.querySelector('.score');
            if (el) { resolve(el); }
            new MutationObserver((mutationRecords, observer) => {
                // Query for elements matching the specified selector
                Array.from(document.querySelectorAll('.score')).forEach((element) => {
                    resolve(element);
                    //Once we have resolved we don't need the observer anymore.
                    observer.disconnect();
                });
            }).observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }).then(() => {
            hideSpoilers();
            futureObserver.observe(document.getElementsByClassName('Event')[0], { childList: true })
        });
    }
})


function hideSpoilers() {
    winnerTeamOne = document.getElementsByClassName('winner-team1');
    winnerTeamTwo = document.getElementsByClassName('winner-team2');

    scoreTeamOne = document.getElementsByClassName('scoreTeam1');
    scoreTeamTwo = document.getElementsByClassName('scoreTeam2');

    for (i = winnerTeamOne.length - 1; i >= 0; i--) {
        winnerTeamOne[i].classList.remove('winner-team1');
    }
    for (i = winnerTeamTwo.length - 1; i >= 0; i--) {
        winnerTeamTwo[i].classList.remove('winner-team2');
    }
    for (let score of scoreTeamOne) {
        score.innerHTML = '?';
    }
    for (let score of scoreTeamTwo) {
        score.innerHTML = '?';
    }
}