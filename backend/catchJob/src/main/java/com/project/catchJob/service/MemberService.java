package com.project.catchJob.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.catchJob.domain.Member;
import com.project.catchJob.repository.MemberRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepo;
	
	public Member createMember(Member member) {
		if(member == null || member.getEmail() == null) {
			throw new RuntimeException("���� �Է��Ͽ����ϴ�!");
		}
		final String email =  member.getEmail();
		if(memberRepo.existsByEmail(email)) {
			log.warn("{} �ش� �̸����� �̹� �����մϴ�!", email);
			throw new RuntimeException("�̹� �����ϴ� �̸����Դϴ�!");
		}
		return memberRepo.save(member);
	}
	

}
