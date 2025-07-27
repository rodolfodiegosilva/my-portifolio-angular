import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLanguage } from '../language.selectors';

interface PersonalData {
  name: string;
  imgProfile: string;
  profession: string;
  description: string;
  aboutTitle: string;
  aboutDescription: string;
}

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
})
export class PersonalDataComponent implements OnInit {
  language$: Observable<string>;
  personalData: PersonalData = {
    name: '',
    imgProfile: '',
    profession: '',
    description: '',
    aboutTitle: '',
    aboutDescription: '',
  };
  constructor(
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.loadProjects();
      this.cdr.detectChanges();
    });
  }

  loadProjects() {
    this.translate.get('personal_data').subscribe((res: any) => {
      this.personalData.name = res.name;
      this.personalData.imgProfile = res.img_profile;
      this.personalData.profession = res.profession;
      this.personalData.description = res.description;
    });
  }
}
