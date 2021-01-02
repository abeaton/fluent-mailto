import { MailtoBuilder } from './Mailto';

describe('MailtoBuilder immutability', () => {
	it('constructs an empty Mailto class instance', () => {
		const mailto = new MailtoBuilder();

		expect(mailto.getAddresses()).toHaveLength(0);
		expect(mailto.getBody()).toBeUndefined();
		expect(mailto.getSubject()).toBeUndefined();
		expect(mailto.getCC()).toHaveLength(0);
		expect(mailto.getBCC()).toHaveLength(0);
	});

	it('constructs a non-empty Mailto class instance', () => {
		const input = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const mailto = new MailtoBuilder(input);

		expect(mailto.getAddresses()).toEqual(input.addresses);
		expect(mailto.getBody()).toEqual(input.body);
		expect(mailto.getSubject()).toEqual(input.subject);
		expect(mailto.getCC()).toEqual(input.cc);
		expect(mailto.getBCC()).toEqual(input.bcc);
	});

	it('adds addresses immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.to('pluto@disney.com');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses.concat('pluto@disney.com'));
		expect(newMailto.getBody()).toEqual(originalInput.body);
		expect(newMailto.getSubject()).toEqual(originalInput.subject);
		expect(newMailto.getCC()).toEqual(originalInput.cc);
		expect(newMailto.getBCC()).toEqual(originalInput.bcc);
	});

	it('adds body immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.body('RANDOM TEST BODY');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(newMailto.getBody()).toEqual('RANDOM TEST BODY');
		expect(newMailto.getSubject()).toEqual(originalInput.subject);
		expect(newMailto.getCC()).toEqual(originalInput.cc);
		expect(newMailto.getBCC()).toEqual(originalInput.bcc);
	});

	it('adds subject immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.subject('RANDOM TEST SUBJECT');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(newMailto.getBody()).toEqual(originalInput.body);
		expect(newMailto.getSubject()).toEqual('RANDOM TEST SUBJECT');
		expect(newMailto.getCC()).toEqual(originalInput.cc);
		expect(newMailto.getBCC()).toEqual(originalInput.bcc);
	});

	it('adds cc immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};

		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.cc('pluto@disney.com');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(newMailto.getBody()).toEqual(originalInput.body);
		expect(newMailto.getSubject()).toEqual(originalInput.subject);
		expect(newMailto.getCC()).toEqual(originalInput.cc.concat('pluto@disney.com'));
		expect(newMailto.getBCC()).toEqual(originalInput.bcc);
	});

	it('adds cc immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.cc('pluto@disney.com');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(newMailto.getBody()).toEqual(originalInput.body);
		expect(newMailto.getSubject()).toEqual(originalInput.subject);
		expect(newMailto.getCC()).toEqual(originalInput.cc.concat('pluto@disney.com'));
		expect(newMailto.getBCC()).toEqual(originalInput.bcc);
	});

	it('adds bcc immutably', () => {
		const originalInput = {
			addresses: ['mickey@disney.com'],
			body: 'Test body',
			subject: 'Test subject',
			cc: ['goofy@disney.com', 'donald.duck@disney.com'],
			bcc: ['walt@disney.com']
		};
		const originalMailto = new MailtoBuilder(originalInput);
		const newMailto = originalMailto.bcc('pluto@disney.com');

		expect(originalMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(originalMailto.getBody()).toEqual(originalInput.body);
		expect(originalMailto.getSubject()).toEqual(originalInput.subject);
		expect(originalMailto.getCC()).toEqual(originalInput.cc);
		expect(originalMailto.getBCC()).toEqual(originalInput.bcc);

		expect(newMailto.getAddresses()).toEqual(originalInput.addresses);
		expect(newMailto.getBody()).toEqual(originalInput.body);
		expect(newMailto.getSubject()).toEqual(originalInput.subject);
		expect(newMailto.getCC()).toEqual(originalInput.cc);
		expect(newMailto.getBCC()).toEqual(originalInput.bcc.concat('pluto@disney.com'));
	});
});
