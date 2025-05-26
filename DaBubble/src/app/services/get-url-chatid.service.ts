import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlChatidService {
private urlParameterSubject = new BehaviorSubject<{
    chatType: string | null;
    chatId: string | null;
    threadsId?: string | null;
  }>({
    chatType: null,
    chatId: null,
    threadsId: null,
  });

  readonly urlParameter$ = this.urlParameterSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        const snapshot = this.router.routerState.snapshot.root;
        const routeParams = this.findDeepestChildWithParams(snapshot);

        const chatType = routeParams?.params['chatType'] || null;
        const chatId = routeParams?.params['id'] || null;
        const threadsId = routeParams?.params['threadsId'] || null; // falls später ergänzt

        this.urlParameterSubject.next({
          chatType,
          chatId,
          threadsId
        });
      });
  }

  // Rekursiv zur tiefsten Route mit Params
  private findDeepestChildWithParams(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot | null {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  get currentParams() {
    return this.urlParameterSubject.getValue();
  }
}