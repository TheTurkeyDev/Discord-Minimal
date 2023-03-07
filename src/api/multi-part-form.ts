type FormPart = {
    name: string
    filename?: string
    contentType: string
    data: string
}
export class MultiPartForm {
    public parts: FormPart[] = [];

    public addPart(name: string, contentType: string, data: string, filename?: string) {
        this.parts.push({
            name,
            contentType,
            data,
            filename
        });
    }

    public generateBody() {
        const data = this.parts.map((p, i) => {
            const cd = `Content-Disposition: form-data; name="${p.name}"${!!p.filename ? `; filename="${p.filename}"` : ''}`;
            const ct = `Content-Type: ${p.contentType}`;
            return `\r\n--boundary\r\n${cd}\r\n${ct}\r\n\r\n${p.data}`;
        }).join('');
        return `${data}\r\n--boundary--`;
    }
}