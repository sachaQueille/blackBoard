var ctx = document.getElementById("myChart");
let ctx2 = document.getElementById("doughnut");
let ctx3 = document.getElementById("chartpie");
let nbFemale = ctx.dataset.female;
let nbMale = ctx.dataset.male;
console.log(nbFemale)
console.log(nbMale)

new Chart(ctx, {

    type: 'doughnut',
    data: {
        labels: ['Femmes', 'Hommes'],
        datasets: [{
            data: [nbFemale, nbMale],
            backgroundColor: [
                'yellow',
                'purple',
            ],

        }]
    }
});

let readMsg = ctx2.dataset.read;
let unreadMsg = ctx2.dataset.unread;

new Chart(ctx2, {

    type: 'doughnut',
    data: {
        labels: ['Messages lus', 'Messages non-lus'],
        datasets: [{
            data: [readMsg, unreadMsg],
            backgroundColor: [
                'blue',
                'orange',
            ],

        }]
    }
});

let payedCmd = ctx3.dataset.payed;
let refusedCmd = ctx3.dataset.refused;
let waitingCmd = ctx3.dataset.waiting;

new Chart(ctx3, {

    type: 'doughnut',
    data: {
        labels: ['Commandes payées', 'Commandes non payées', 'Paiement en attente'],
        datasets: [{
            data: [payedCmd, refusedCmd, waitingCmd],
            backgroundColor: [
                'green',
                'pink',
                'brown',
            ],

        }]
    }
});