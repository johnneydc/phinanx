import {EntryRepository} from './entry-repository';
import {getTestDb} from '../config';
import {Entry, EntryType} from './entry';

describe('EntryRepository', () => {
  let entryRepository: EntryRepository;

  beforeEach(async () => {
    entryRepository = new EntryRepository(await getTestDb());
  });

  it('listAll should not return anything', async () => {
    const entries = await entryRepository.findAll();
    expect(entries.length).toBe(0);
  });

  it('saved entries should be the same object when fetched', async () => {
    const entry = new Entry({
      datePosted: new Date(),
      amount: 10,
      type: EntryType.in,
      deductFrom: '1',
      accountTo: '2'
    });

    const savedId = (await entryRepository.save(entry)).id;
    const savedEntry = await entryRepository.findById(savedId || '');

    if (savedEntry == null) {
      fail();
    }

    expect(savedEntry?.equals(entry)).toBeTrue();
  });

  it('entries count should be increase when new entry is added', async () => {
    const entry = new Entry({
      datePosted: new Date(),
      amount: 10,
      type: EntryType.in,
      deductFrom: '1',
      accountTo: '2'
    });

    await entryRepository.save(entry);

    const entries = await entryRepository.findAll();
    expect(entries.length).toBe(1);
  });

  it('should update existing entries with new entry updates', async () => {
    const entry = new Entry({
      datePosted: new Date(),
      amount: 10,
      type: EntryType.in,
      deductFrom: '1',
      accountTo: '2'
    });

    const savedId = (await entryRepository.save(entry)).id;
    const entryToBeUpdated = await entryRepository.findById(savedId || '');

    if (entryToBeUpdated == null) {
      fail(); return;
    }

    const newCategory = 'new_cat';
    entryToBeUpdated.category = newCategory;

    const updatedEntryId = (await entryRepository.save(entryToBeUpdated)).id;
    const entryToBeTested = await entryRepository.findById(updatedEntryId || '');

    if (entryToBeTested == null) {
      fail(); return;
    }

    expect(entryToBeTested.category === newCategory).toBeTrue();
  });

  it('deleting entry should delete it in db', async () => {
    const entry = new Entry({
      datePosted: new Date(),
      amount: 10,
      type: EntryType.in,
      deductFrom: '1',
      accountTo: '2'
    });

    await entryRepository.save(entry);
    let count = await entryRepository.countAll();

    expect(count).toBe(1);

    await entryRepository.delete(entry);
    count = await entryRepository.countAll();

    expect(count).toBe(0);
  });
});
