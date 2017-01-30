import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import { SelectMode } from './../src/components'

describe('SelectMode', () => {
    it('should be able to select mode: Login or practice mode', () => {
        const wrapper = shallow(<SelectMode/>)
        expect(wrapper.containsAllMatchingElements([
            <h1>Select mode:</h1>,
            <button>Log in</button>,
            <button>Practice</button>
        ])).to.equal(true)
    })
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test!
    })
});