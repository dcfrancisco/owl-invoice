import { DocumentCollection } from './document-collection';
import { IDocumentFs } from './document-fs';

describe('DocumentCollection', () => {

    const DocumentFsMock = jest.fn<IDocumentFs>(() => ({
        getCollection: jest.fn(() => Promise.resolve(['ab', 'abc', 'abcd', 'abcde'])),
        getDocument: jest.fn(() => Promise.resolve())
    }));

    let documentFsMock: IDocumentFs;
    let documentCollection: DocumentCollection;

    beforeEach(() => {
        documentFsMock = new DocumentFsMock();
        documentCollection = new DocumentCollection('col1', documentFsMock);
    });

    describe('getAll', () => {
        test('call documentFsMock getCollection', async () => {
            await documentCollection.getAll();
            expect(documentFsMock.getCollection).toHaveBeenCalledWith('col1');
        });
        describe('without query', () => {
            test('load all documents in collection', async () => {
                await documentCollection.getAll();
                expect(documentFsMock.getDocument).toBeCalledTimes(4);
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'ab');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abc');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcd');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcde');
            });
        })
        describe('by id query', () => {
            test('load only matched documents', async () => {
                await documentCollection.getAll({ id: 'abcd*' });
                expect(documentFsMock.getDocument).toBeCalledTimes(2);
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcd');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcde');
            });
        })
    });
})
