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
        Meteor.subscribe('food', Session.get('phrase'), function()
        {
            $('li').tooltip({container: 'body'});
        });
    });
    Template.search.data = function() { return Food.find() };
    Template.search.events({
        'change input': function(event) {
            Session.set('phrase', event.target.value);
        }
    });
    Template.search.helpers({
        isWanted: function(tagname) {
            return tagname in info ? true : false;
        },
        nameOf: function(tagname) {
            return tagname in info ? info[tagname] : '';
        }
    });
}

info = {'PROCNT': 'Protein', 'FAT': 'Fat', 'CHOCDF': 'Carb',
    'ENERC_KCAL': 'Cal', 'SUGAR': 'Sugar', 'FIBTG': 'Fibre'};
