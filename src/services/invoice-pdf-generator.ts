// const wkhtmltopdf: any = require('wkhtmltopdf');
// import ejs from 'ejs';
// import { Stream } from 'stream';
// import fs from 'fs';
// import { Invoice } from '../models/invoice';

// export class InvoicePdfGenerator {
//     public async generate(invoice: Invoice, templateName: string, templateParams: InvoiceTemplateParams): Promise<Stream> {



//         return new Promise((resolve, reject) => {
//             ejs.renderFile(templatePath, model, { cache: true }, (ejsError: Error, html?: string) => {
//                 if (ejsError || !html) {
//                     reject(ejsError || new Error('No result returned from the template engine.'));
//                 } else {
//                     wkhtmltopdf(html, { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }, (wkError: Error, pdfStream: Stream) => {
//                         if (wkError) {
//                             reject(wkError);
//                         } else {
//                             //TODO: what to return?
//                             // resolve(pdfStream);
//                             pdfStream.pipe(fs.createWriteStream('out.pdf'));
//                         }
//                     });
//                 }
//             });
//         });
//     }
// }

// export interface InvoiceTemplateParams {
//     language : 'SK' | 'AT';
// }


// // let invoice = {
// //     sum: 2100,
// //     client: 'some client',
// //     test: 'ahoj'
// // };
// // new PdfGenerator().generate('templates/invoice-sk.html', invoice).then(stream => {
// //     //  stream.pipe(fs.createWriteStream('out2.pdf'));
// // }).catch(console.error);