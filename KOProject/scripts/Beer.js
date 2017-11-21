function BeerOrder(beerType, quantity) {
    var self = this;
    self.beerType = ko.observable(beerType);
    self.quantity = ko.observable(quantity)
    self.subtotal = ko.computed (function() {
        var subtotal = self.beerType().cost * self.quantity().value;
        return "$" + subtotal.toFixed(2);
    });
}

function BeerViewModel() {
    var self = this;

    //Types of beers
    self.AvailableBeers = [
        { beerName: "Pabst Blue Ribbon ($2)", cost: 2, description: "You get what you pay for." },
        { beerName: "Rolling Rock ($3)", cost: 3, description: "The bottle has a horse on it." },
        { beerName: "Red Hook ESB ($3.50)", cost: 3.50, description: "Pretty good, for a Seattle beer." },
        { beerName: "Overrated IPA ($5)", cost: 5, description: "High IBU. High ABV" }
    ];
    //Number dropdown
    self.AvailableQs = [
        { display: "One", value: 1},
        { display: "Two", value: 2 },
        { display: "Three", value: 3 },
        { display: "Four", value: 4 },
        { display: "Five", value: 5 },
        { display: "Six Pack", value: 6 }
    ]
    //Orders Array
    self.orders = ko.observableArray([
        new BeerOrder(self.AvailableBeers[0], self.AvailableQs[0])
    ])
    //Calculate Total
    self.grandTotal = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.orders().length; i++)
            total += self.orders()[i].beerType().cost * self.orders()[i].quantity().value;
        return total;
    });
    //Choose beer for details
    //self.choosenBeer

    //Add and Remove
    self.addOrder = function () {
        self.orders.push(new BeerOrder(self.AvailableBeers[0], self.AvailableQs[0]));
    }
    self.removeOrder = function (order) { self.orders.remove(order) }

}

ko.applyBindings(new BeerViewModel());