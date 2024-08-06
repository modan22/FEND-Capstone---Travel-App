import { getDestination } from '../src/client/js/utils';

describe('Test getDestination function', () => {
    beforeEach(() => {
        // Set up the DOM with the input field
        document.body.innerHTML =
            '<input type="text" id="destination">';
    });

    test('should return Munich', () => {
        // Set the value of the input field
        document.getElementById('destination').value = 'Munich';

        // Call the function and assert the result
        const destination = getDestination();
        expect(destination).toEqual('Munich');
    });
});
