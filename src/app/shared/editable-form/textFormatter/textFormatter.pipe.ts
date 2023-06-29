import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'textFormatter' })
export class TextFormatterHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    if (!value) {
      return '';
    }
    const regexpEmail = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const regexUrl = new RegExp( /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);
    const strValue = value.toString();

    // TODO: update with bypassSecurityTrustHtml
    return (
      regexpEmail.test(strValue) ?
        "<a href='mailto:"+ strValue +"'>" + strValue + "</a>" :
      regexUrl.test(strValue) ?
        "<a href='" + strValue + "' target='_blank'>"+strValue+"</a>" :
        strValue
    );
  }
}