/**
 * Mock Memory Service simulating `nvidia/llama-nemotron-embed-vl-1b-v2:free`.
 * This service simulates storing multimodal documents and retrieving them
 * based on text queries by matching embedded features (mocked with simple text search here).
 */

const STORAGE_KEY = 'staticfund_nemotron_memory';

class MemoryService {
  constructor() {
    this._loadMemory();
  }

  _loadMemory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      this.documents = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load memory:", e);
      this.documents = [];
    }
  }

  _saveMemory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.documents));
    } catch (e) {
      console.error("Failed to save memory:", e);
    }
  }

  /**
   * Embeds and stores a document.
   * @param {Object} doc The document to store. Can contain text, image_url, and metadata.
   */
  async store(doc) {
    // In a real implementation, we would call the Nvidia API to get embeddings here.
    // For now, we just store the raw document to simulate retrieval later.
    const newDoc = {
      id: Date.now().toString(),
      ...doc,
      timestamp: new Date().toISOString()
    };

    this.documents.push(newDoc);
    this._saveMemory();
    console.log(`Stored document in Memory Service [${newDoc.id}]`);
    return newDoc;
  }

  /**
   * Queries the stored documents using a text query.
   * @param {string} query The text query to search for.
   * @returns {Array} Array of matched documents (mocked similarity).
   */
  async query(queryText) {
    console.log(`Querying Memory Service for: "${queryText}"`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!queryText || typeof queryText !== 'string') return [];

    const lowerQuery = queryText.toLowerCase();

    // Mock retrieval: Simple substring match on available text fields.
    // A real implementation would compare the query embedding against stored document embeddings.
    const results = this.documents.filter(doc => {
      let matches = false;
      if (doc.text && doc.text.toLowerCase().includes(lowerQuery)) matches = true;
      if (doc.metadata && doc.metadata.name && doc.metadata.name.toLowerCase().includes(lowerQuery)) matches = true;
      return matches;
    });

    return results;
  }

  /**
   * Gets all documents (for debug/dashboard purposes).
   */
  getAll() {
    return this.documents;
  }
}

const memoryService = new MemoryService();
export default memoryService;
