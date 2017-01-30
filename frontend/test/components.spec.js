import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import { SelectMode } from '../src/SelectMode'
import {Link} from "react-router";

describe('SelectMode', () => {
    it('should be able to select mode: Login or practice mode', () => {
        //TODO: The previous "containsAllMatchingElements" test wont ever pass for some reason... ??
    })
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    })
});

