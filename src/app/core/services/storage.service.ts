import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../configs/storage-keys.config';
import { LocalUser } from '../models/local-user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	constructor() { }
	
	getLocalUser(): LocalUser {

		let user = localStorage.getItem(STORAGE_KEYS.localUser);

		if (user == null) {
			return null;
		} else {
			return JSON.parse(user);
		}

	}

	setLocalUser(obj: LocalUser) {

		if (obj == null) {
			localStorage.removeItem(STORAGE_KEYS.localUser);
		} else {
			localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
		}

	}
}
