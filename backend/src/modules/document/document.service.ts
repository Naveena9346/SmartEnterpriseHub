import { DatabaseContext, DocumentEntity } from '../../database/db';

export class DocumentService {
  public async getDocuments(orgId: string) {
    let docs = DatabaseContext.documents.filter((d) => d.orgId === orgId);
    if (docs.length === 0) {
      // Seed default sample documents if empty
      docs = [
        {
          id: 'doc-1',
          orgId,
          title: 'Enterprise Architecture Blueprint 2026.pdf',
          fileName: 'architecture_blueprint.pdf',
          fileSize: 4520112,
          mimeType: 'application/pdf',
          storageKey: 's3://enterprise-bucket/docs/blueprint.pdf',
          version: 1,
          uploadedBy: 'usr-admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'doc-2',
          orgId,
          title: 'Q3 Financial Audit & Tax Filing.xlsx',
          fileName: 'financial_audit_q3.xlsx',
          fileSize: 1245080,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          storageKey: 's3://enterprise-bucket/docs/q3_audit.xlsx',
          version: 2,
          uploadedBy: 'usr-accountant',
          createdAt: new Date().toISOString()
        }
      ];
      DatabaseContext.documents.push(...docs);
    }
    return docs;
  }

  public async uploadDocument(orgId: string, userId: string, data: any) {
    const newDoc: DocumentEntity = {
      id: `doc-${Date.now()}`,
      orgId,
      title: data.title || 'Untitled Document',
      fileName: data.fileName || 'document.pdf',
      fileSize: data.fileSize || 1048576,
      mimeType: data.mimeType || 'application/pdf',
      storageKey: `s3://enterprise-storage/${Date.now()}`,
      version: 1,
      uploadedBy: userId,
      createdAt: new Date().toISOString()
    };
    DatabaseContext.documents.push(newDoc);
    return newDoc;
  }
}
