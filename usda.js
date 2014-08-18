Food = new Meteor.Collection('nutrition');

if (Meteor.isServer)
{
    Meteor.publish('food', function(phrase)
    {
        pat = new RegExp(phrase, 'i');
        return Food.find({description: pat}, {limit: 25});
    });
}

if (Meteor.isClient)
{
    Deps.autorun(function()
    {
        Meteor.subscribe('food', Session.get('phrase'));
    });

    Template.search.data = function() { return Food.find() };

    Template.search.events({
        'change input': function(event) {
            Session.set('phrase', event.target.value);
        }
    });
}
