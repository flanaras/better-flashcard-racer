import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig from '../src/DeckConfig'
import MotherOfDragons from '../src/MotherOfDragons'

describe('SelectMode', () => {
    it('should be able to select mode: Login or practice mode', () => {
        //TODO: The previous "containsAllMatchingElements" test wont ever pass for some reason... ??
    })
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    })
});

describe('DeckConfig', () => {
    it('should dispaly decks in a dropdown', () => {
        const decks = ['Easy plus and minus', 'Medium plus and minus', 'Hard pus and minus']
        const wrapper = shallow(<DeckConfig decks={decks}/>)
        wrapper.setState({decks})
        expect(wrapper.find('option').length).to.equal(3)
    })
    it('onDeckChange should be called when the selected deck is changed', () => {
        const onDeckChangeSpy = spy()
        const decks = [{id: 1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = shallow(<DeckConfig decks={decks} onDeckChange={onDeckChangeSpy}/>)
        const dropdown = wrapper.find('select')
        dropdown.simulate('change', ({target:{value: 2}}))
        expect(onDeckChangeSpy.calledOnce).to.equal(true)
        expect(onDeckChangeSpy.calledWith(2)).to.equal(true)
    })
    it('choosing a deck should change the currently chosen deck', () => {
        const chosenDeck = {id:1, desc: 'Easy plus and minus'}
        const decks = [{id:1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = shallow(<MotherOfDragons children={DeckConfig} />)
        wrapper.setState({chosenDeck})
        wrapper.setState({decks})
        wrapper.instance().onDeckChange(2)
        console.log(wrapper.state.chosenDeck)
        expect(wrapper.state('chosenDeck')).to.eql({id:2, desc: 'Medium plus and minus'})
    })
})
